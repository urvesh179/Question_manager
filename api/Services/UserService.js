const user = require('../models/User');
const util = require('./utils');

exports.addUser = async (req, res) => {
    try {
        const u = new user(req.body);
        var token = await util.generateToken(u);
        if (!token) {
            return res.status(400).send("bad request");
        }
        var result = await u.save();
        if (!result) {
            return res.status(400).send("bad request");
        }
        return res.status(201).send({ "user": u, "token": token });

    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getUser = async (req, res) => {
    try {
       var username=req.params.username;
       const u=await user.findOne({username:username});
       if(u)
       {
          return res.status(200).send(u);
       }
       return res.status(400).send("not found");

    } catch (err) {
        res.status(400).send(err);
    }
}


exports.login = async (req, res) => {
    
    try {
        var role_id=await Role.findOne({
            name:req.body.role
        })
        
        const u = await user.findOne({
            username: req.body.username,
            role_id:role_id._id,
            is_deleted: false
        })
        if (u == null) {
            return res.status(401).send("Invalid User");
        }
        let valid = await bcrypt.compare(req.body.password, u.password);
        if (!valid) {
            return res.status(401).send("Invalid Password");
        }
        const token = await util.generateToken(u);
        res.status(200).send({ "user": u, "token": token });
    }
    catch (e) {
        res.status(400).send(e);
    }

}
