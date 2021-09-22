const mongoose = require("mongoose");
let userDB = {};

// delete user collection by db name
async function deleteDB(dbName){
  const result = await mongoose.model(`${dbName}`).collection.drop();
  // result is true if got deleted
  if (result) {
    console.log("USER DELETED");
  } else {
    console.log("UNEXPECTED ERROR");
  }
}



// create schema with given name and return
function createDB(dbName) {
  
  userDB[dbName] = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
  });
  return  mongoose.model(`${dbName}`,userDB[dbName]);
}

module.exports = {createDB,deleteDB};
