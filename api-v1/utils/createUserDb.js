const mongoose = require("mongoose");
userDB = {};

async function deleteDB(dbName){
  const result = await mongoose.model(`${dbName}`).collection.drop();
  console.log(result);
}




function createDB(dbName) {
  
  userDB[dbName] = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
  });
  return  mongoose.model(`${dbName}`,userDB[dbName]);
}

module.exports = {createDB,deleteDB};
