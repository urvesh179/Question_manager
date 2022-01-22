const Language=require("../models/Language");

exports.addLanguage=async(req,res)=>
{
    try{
        const lan=new Language(req.body);
        const result=await lan.save();
        console.log("----")
        if(result)
        {
            return res.status(201).send(lan);
        }
        else
        {
            return res.status(400).send("bad request");
        }

    }catch(err)
    {
        res.status(400).send(err);
    }
}


exports.getAllLanguage = async (req, res) => {
    try {
        const data = await Language.find({isDeleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.getLanguageById = async (req, res) => {
    try {
        const data = await Language.findOne({
            _id: req.params.id,
            isDeleted: 0
        })
        if (data) {
            return res.status(200).send(data)
        }
        else {
            return res.status(400).send("No Data Found")
        }

    } catch (err) {
        return res.status(400).send("Language Not Found");
    }
}


exports.deleteLanguage = async (req, res) => {
    try {
        const data = await Language.findById(req.params.id);
        data.isDeleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.editLanguage = async (req, res) => {
    try {
        await Language.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
                return res.status(201).send("Language Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}
