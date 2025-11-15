const Ads = require('../../module/ads');

module.exports.add_ads = async (req, res) => {
    try{
        const {title, description} = req.body;
        const photo = req.file ;
        if(!title || !description || !photo){
            res.status(404).josn({
                message:"يرجى إدخال كامل الحقول.. المطلوبة."
            });
        }
        await Ads.create({
            title,
            description,
            photo
        });
        res.status(201).json({
            message:"تمت إضافة الإعلان بنجاح"
        });
    }catch(err){
        res.status(500).json({
            message:"حدث خطأ أثناء إضافة الإعلان",
            Error:err.message
        })
    }
}