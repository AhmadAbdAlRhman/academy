const { response } = require('express');
const Branch = require('../../module/class');
const Subject = require('../../module/subjects');

module.exports.add_class = async (req, res) => {
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

module.exports.add_subject = async (req, res) => {
    try{
        const {name, teacher_name, teacher_phone} = req.body;
        const subject = await Subject.create({
            name,
            teacher_name,
            teacher_phone
        });
        res.status(201).json({
            message:"",
            Subject: subject
        })

    }catch(err){
        res.status().json({
            message:"حدث خطأ أثناء إضافة المادة",
            Error:err.message
        })
    }
}