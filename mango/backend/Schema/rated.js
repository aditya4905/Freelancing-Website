const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const is_it_rated = new Schema(
  {
    client: {
      type: String,
      required: true,
    },
    lancer: {
      type: String,
      required: false,
    },
    rating2:{
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const c = mongoose.model("rated",is_it_rated);
module.exports = c;
