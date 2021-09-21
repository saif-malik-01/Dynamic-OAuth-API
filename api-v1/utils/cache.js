const redis = require('redis');
require('dotenv').config();
const redisUrl = process.env.REDIS_KEY;
const client = redis.createClient(redisUrl);
const {promisify} = require('util');


// store refersh token for specific user by there appname and email

 function create(appName,user,data){
  client.hset(appName,user,JSON.stringify([data]), (err,value)=>{
      if(err) console.log(err);
      console.log("hset done",data);
     
  })
}

// return refersh token array associate wtih given appName and user email

async function get(appName,user){
  client.hget = promisify(client.hget);
  const res = await client.hget(appName,user);
  return JSON.parse(res);
}

module.exports ={create,get};