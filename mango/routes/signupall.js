const express = require('express');
const lancer = require("../Schema/lancer");
const client = require("../Schema/client");
const project = require("../Schema/project");
const router = express.Router();
router.post("/signupp", async (req, res) => {
  const { name, lancer_id, client_id, description, date, cost } = req.body;
  console.log(req.body);
  try {
    const flag = 0;
    const pro = new project({
      client_id: client_id,
      lancer_id: lancer_id,
      description: description,
      cost: cost,
      date: date,
      name: name,
    });
    console.log(pro);
    const p = await pro.save();
    return res.send({
      message: "project added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;