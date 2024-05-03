const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lancer = new Schema({
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
  skills: {
    type: [String],
    required: true,
  },
  project_ids:{
    type:[String],
    required:false,
  },
  rating:{
    type:Number,
    required:false,
  },
  people:{
    type:Number,
    required:true,
  },
  email:{
    type:String,
    required:true,
  }
}, { timestamps: true });

const l = mongoose.model('lancer', lancer);
module.exports = l;