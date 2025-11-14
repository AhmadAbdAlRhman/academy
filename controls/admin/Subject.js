const Class = require('../../module/class');
const Subject = require('../../module/subjects');
const Subject_Class = require('../../module/class_subject');
const sequelize = require('../../config/db');

module.exports.add_class = async (req, res) => {
    try{
        const name = req.body.name;
        const new_class = await Class.create({
            name
        });
        res.status(200).json({
            message:`تمت إضافة ${new_class.name}`
        });
    }catch(err){
        res.status(500).json({
            message:"",
            Error: err.message
        })
    }
}

module.exports.add_subject = async (req, res) => {
    const transaction = await sequelize.transaction();
    try{
        const {name, teacher_name, teacher_phone, class_id} = req.body;
        if (!name || !class_id){
            return res.status(400).json({
                message:"الرجاء إدخال اسم المادة والصف"
            });
        }
        const ClassRow = await Class.findByPk(class_id);
        if(!ClassRow){
            return res.status(404).json({
                message: "الصف المطلوب غير موجود"
            });
        }

        const subject = await Subject.create({
            name,
            teacher_name,
            teacher_phone
        },{
            transaction
        });
        await Subject_Class.create({
            ClassId: class_id,
            SubjectId: subject.id
        },{
            transaction
        });
        await transaction.commit();
        res.status(201).json({
            message: `تمت إضافة المادة "${subject.name}" بنجاح إلى صف "${ClassRow.name}"`,
            Subject: subject
        })

    }catch(err){
        res.status().json({
            message:"حدث خطأ أثناء إضافة المادة",
            Error:err.message
        })
    }
}