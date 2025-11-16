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

module.exports.get_all_ads = async (_req, res) => {
    try{
        const ads = await Ads.findAll();
        res.status(200).json({
            message:"تم جلب جميع الإعلانات ب نجاح",
            Ads: ads
        });
    }catch(err){
        res.status(500).json({
            message:"حدث خطأ أثناء جلب الإعلانات",
            Error: err.message
        })
    }
}

module.exports.get_one_ads = async(req, res) => {
    try{
        const ads_id = req.params.ads_id;
        const ads = await Ads.findByPk(ads_id);
        if(!ads){
            return res.status(404).json({
                message:"لا يوجد هذا الإعلان في قاعدة البيانات"
            });
        }
        return res.status(200).json({
            message:"تم جلب الإعلان بنجاح",
            ads
        });
    }catch(err){
        return res.status(500).json({
            message:"حدث خطأ أثناء جلب الإعلان ",
            Error: err.message
        })
    }
}
