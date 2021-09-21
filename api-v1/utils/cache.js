const redis = require('redis');
require('dotenv').config();
const mongoose = require('mongoose');
const redisUrl = process.env.REDIS_KEY;
const client = redis.createClient(redisUrl);

function create(key,data){
  client.set(key,data,(err,value)=>{
      if(err) console.log(err);
      console.log(value);
  })
}

module.exports ={create};