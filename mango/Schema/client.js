const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const client = new Schema({
  username: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:false,
  },
  password: {
    type: String,
    required: true,
  },
  project_ids:{
    type:[String],
    required:false,
  },
  email:{
    type:String,
    required:true,
  }
}, { timestamps: true });
client.pre("save", async function (next) {
  if(this.password.length>20)next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const c = mongoose.model('client', client);
module.exports = c;