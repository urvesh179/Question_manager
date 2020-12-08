const Question=require('../models/Question');

exports.getAll = async (req, res) => {
    try {
        const data = await Question.find({isDeleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.add=async(req,res)=>
{
    try{
        const question=new Question(req.body);
        const result=await question.save();
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
        const data = await Question.findOne({
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
        return res.status(400).send("Question Not Found");
    }
}


exports.delete = async (req, res) => {
    try {
        const data = await Question.findById(req.params.id);
        data.isDeleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.edit = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
            if (err) {
                return res.status(400).send(err)
            }
            else {
            return res.status(201).send("Question Updated")
            }
        });
    } catch (e) {
        return res.status(400).send("Not Updated")
    }
}


