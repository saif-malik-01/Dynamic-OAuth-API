const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cache = require('../../utils/cache');



async function post(req, res) {

   // validate user data
   try {
      const { email, password } = req.body;
      const user = mongoose.model(`${req.originalUrl.split('/')[2]}`);

      // find user in app name db
      const User = await user.findOne({ email});

      // compare store hased password with given password
      if (User && bcrypt.compareSync(password,User.password)) {

      // generate access token for user 
        const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 

      // generate refersh token  
        const refreshToken = jwt.sign({password},process.env.REFRESH_TOKEN_SIGNATURE,{expiresIn:'6h'})

        // store refresh token with user's appName and email as a key
        cache.create(req.originalUrl.split('/')[2],email,refreshToken);

        return res.status(200).json({ ACCESS_TOKEN: token,REFRESH_TOKEN: refreshToken });
      } else {
        return res.status(401).json({ code: 401, message: "user not found" });
      }
    } catch (error) {
        res.status(401).json({ code: 401, required: "All Fields" });
    }
 
  
}


module.exports = { post };
