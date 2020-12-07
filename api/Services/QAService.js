const QA=require('../models/QA');

exports.getAll = async (req, res) => {
    try {
        const data = await QA.find({isDeleted:false})
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.add=async(req,res)=>
{
    try{
        const qa=new QA(req.body);
        const result=await qa.save();
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

exports.addAns=async(req,res)=>
{
    try{
        const id=req.params.id;
        const data=await QA.findOne({_id:id,isDeleted:0});
        if(data!=null)
        {
            data.answers.push(req.body.answers);
            const result=await data.save();
            if(result)
            {
                return res.status(201).send(result);
            }
            else
            {
                return res.status(400).send("bad request");
            }
        }
        return res.status(400).send("no question found");
        
        

    }catch(err)
    {
        res.status(400).send(err);
    }
}


exports.getById = async (req, res) => {
    try {
        const data = await QA.findOne({
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


exports.delete = async (req, res) => {
    try {
        const data = await QA.findById(req.params.id);
        data.isDeleted=true;
        await data.save();
        res.status(200).send(data)

    } catch (err) {
        return res.status(400).send("bad request");
    }
}

exports.edit = async (req, res) => {
    try {
        await QA.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true}, (err) => {
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


