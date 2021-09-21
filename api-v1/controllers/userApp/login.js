const path = require("path");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cache = require('../../utils/cache');

function get(req, res) {
  res.sendFile(path.resolve(__dirname, "./login.html"));
}

async function post(req, res) {

    
  if (req.body) {
   try {
      const { email, password } = req.body;
      const user = mongoose.model(`${req.originalUrl.split('/')[2]}`);
      const User = await user.findOne({ email});
      if (User && bcrypt.compareSync(password,User.password)) {
        const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 
        const refreshToken = jwt.sign({password},process.env.REFRESH_TOKEN_SIGNATURE,{expiresIn:'6h'})

        // store refersh token with user's appName and email as a key
        cache.create(req.originalUrl.split('/')[2],email,refreshToken);

        return res.status(200).json({ ACCESS_TOKEN: token,REFRESH_TOKEN: refreshToken });
      } else {
        return res.status(401).json({ code: 401, message: "user not found" });
      }
    } catch (error) {
      return res
        .status(401)
        .json({ code: 401, message: "Could not connect to server",error });
    }
  } else {
    res.status(401).json({ code: 401, required: "All Fields" });
  }
  
}


module.exports = { post, get };
