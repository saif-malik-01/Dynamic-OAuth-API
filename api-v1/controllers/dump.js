const user = require("../models/user");
const path = require('path');
const bcrypt = require('bcryptjs');
const {DeleteUserRouter} = require('../utils/createUserRouter');
const {deleteDB} = require('../utils/createUserDb');


async function post(req, res) {
  if (req.body) {
    const { email, password } = req.body;
    const profile = await user.findOne({ email });
    if (profile) {
      if(!bcrypt.compareSync(password,profile.password)) 
        res.json({code:401,message:"Please check your password!"})
      try {
        DeleteUserRouter(profile.appName);
        deleteDB(profile.appName);
        await user.deleteOne({ email });
        return res.status(200).json({code:200,message:"User Deleted!" })
      } catch (error) {
        return res
          .status(401)
          .json({
            code: 401,
            message: "Can't connect to database, try after some time.",
          });
        }
    } else {
      return res.status(401).json({ code: 401, message: "User not found!" });
    }
  } else {
    return res
      .status(401)
      .json({ code: 401, message: "Email & password is required!" });
  }
}



module.exports = {post};
