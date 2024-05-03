const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
  name: {
    type: String,
    required: true,
  },
  lancer_id:{
    type: String,
    required:true,
  },
  client_id:{
    type:String,
    required:true,
  },
  cost:{
    type:Number,
    required:true,
  },
  description:{
    type:String ,
    required:true,
  },
  date : {
    type : Date,
    required : true,
  }
}, { timestamps: true });

const l = mongoose.model('project', project);
module.exports = l;