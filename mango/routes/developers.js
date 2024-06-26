const express = require ('express');
const router  =   express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const lancer = require("../Schema/lancer");
router.post("/developers/:id", async (req, res) => {
  let id2 = req.params.id;
  // console.log(id2);
  // lancer.find({skills:{$all:['a','b']}}).then((result)=>{
  //   console.log(result);
  // });
  let result = await lancer.find({ skills: id2 });
  // console.log(result);
  if (result.length != 0) {
    res.send({
      result,
      message: "Some good lancers are here",
    });
  } else {
    res.send({
      result,
      message: "Try finding another skill",
    });
  }
});
module.exports = router;