const express = require('express');
const lancer = require("../Schema/lancer");
const client = require("../Schema/client");
const project = require("../Schema/project");
const rated = require("../Schema/rated");
const router = express.Router();
router.post("/rateit", async (req, res) => {
  try {
    const giver = req.body.user;
    const given = req.body.id;
    const exist = await rated.findOneAndUpdate(
      { client: giver, lancer: given }, // find by this
      { rating2: req.body.rating }, // update this
      { new: false, upsert: true } // 'new' option returns the updated rating, 'upsert' option creates a new document if it doesn't exist
    );
    let minus = 0;
    if (exist) minus = exist.rating2;
    const t = await lancer.findOne({ username: given });
    let people_in_lancer = 0;
    if (t.people) people_in_lancer = t.people;
    let calc = people_in_lancer * 1.0 * t.rating;
    calc -= minus;
    calc += req.body.rating;
    let new_people = people_in_lancer;
    if (!exist) new_people += 1;
    calc /= new_people;
    await lancer.findOneAndUpdate(
      { username: given },
      { rating: calc, people: new_people },
      { upsert: true }
    );
  } catch (err) {
    console.log(err);
    message: "Not able to rate";
  }
});
module.exports = router;