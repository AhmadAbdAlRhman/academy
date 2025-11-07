const Branch = require('../../module/class');

module.exports.add_branch = async (req, res) => {
    try{
        const name = req.body.name;
        const new_branch = await Branch.create({
            name
        });
        res.status(200).json({
            message:`تمت إضافة ${new_branch.name}`
        });
    }catch(err){
        res.status(500).json({
            message:"",
            Error: err.message
        })
    }
}

module.exports.add_courses = async (req, res) => {
    try{
        const {name, teacher_name, teacher_phone} = req.body;

    }catch(err){
        res.status().json({
            message:"حدث خطأ أثناء إضافة المادة",
            Error:err.message
        })
    }
}