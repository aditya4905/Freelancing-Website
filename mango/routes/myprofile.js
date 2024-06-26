const express = require("express");
const lancer = require("../Schema/lancer");
const client = require("../Schema/client");
const rated = require("../Schema/rated");
const router = express.Router();
router.post("/myprofile/:user", async (req, res) => {
  const url = req.url;
  let id = "";
  for (let i = 0; i < url.length; i++) {
    if (url[i] == "/") id = "";
    else id += url[i];
  }
  const username = id;
  // console.log(username);
  let tem = req.body.client;
  let r;
  if (tem) r = await rated.findOne({ client: tem, lancer: id });
  let rating_given = 0;
  if (r) {
    rating_given = r.rating2;
  }

  try {
    const flag = 0;
    let result = await client.findOne({ username });
    if (result) {
      return res.send({
        flag: 1,
        result,
      });
    }
    result = await lancer.findOne({ username });
    if (result) {
      return res.send({
        flag: 0,
        result,
        rating_given,
      });
    } else {
      return res.send({
        flag: 2,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;