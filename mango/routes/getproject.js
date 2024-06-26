const project = require("../Schema/project");
const express = require("express");
const accepted = require('../Schema/accepted');
const router = express.Router();
router.post("/getproject/:id", async (req, res) => {
  const project_id = req.params.id;
  try {
    //   const flag = 0;
    let result = await project.findOne({ _id: project_id });
    if(result){
          const year = result.date.getFullYear();
          const month = result.date.getMonth();
          const day = result.date.getDay();
          return res.send({
            result ,day,month,year
          }
          );
    }
    result = await accepted.findOne({ _id: project_id });
     const year = result.date.getFullYear();
     const month = result.date.getMonth();
     const day = result.date.getDay();
    return res.send({result,day,month,year});       
   
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;