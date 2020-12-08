const Answer=require('../models/Answer');

exports.getAll = async (req, res) => {
    try {
        const data = await Answer.find({isDeleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.add=async(req,res)=>
{
    try{
        const answer=new Answer(req.body);
        const result=await answer.save();
        if(result)
        {
            return res.status(201).send(result);
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

exports.getById = async (req, res) => {
    try {
        const data = await Answer.findOne({
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
        return res.status(400).send("Answer Not Found");
    }
}


exports.delete = async (req, res) => {
    try {
        const data = await Answer.findById(req.params.id);
        data.isDeleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.edit = async (req, res) => {
    try {
        await Answer.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
            return res.status(201).send("Answer Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}


