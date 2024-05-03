const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const c = mongoose.model('client', client);
module.exports = c;