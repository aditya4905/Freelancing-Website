const lancer = require("../Schema/lancer");
const client = require("../Schema/client");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'mango';
const age = 2*24*60*60
router.post('/signuplancer',async (req,res)=>{
     const { name, username, password, email, skills } = req.body;

     try {
       let result = await client.findOne({ username });
       if (result) {
         res.send({
           message: "enter another user name",
           flag: 1,
         });
       } else {
         result = await lancer.findOne({ username });
         if (result) {
           res.send({
             message: "enter another user name",
             flag: 1,
           });
         } else {
            const user2 = new lancer({
                name: name,
                username: username,
                password: password,
                email: email,
                skills: skills,
                rating: 0,
                people: 0,
            });
           user2.save();
           res.send({
             message: "Done",
             flag: 0,
           });
         }
       }
     } catch (error) {
       console.log(error);
       res.status(500).send({
         message: "Internal Server Error",
       });
     }
});
router.post("/signupclient", async (req, res) => {
  const { name, username, password, email } = req.body;

  try {
    const flag = 0;
    const user2 = new client({
      name: name,
      username: username,
      password: password,
      email: email,
    });

    let result = await lancer.findOne({ username });
    if (result) {
      return res.send({
        message: "enter another user name",
        flag: 1,
      });
    }

    result = await client.findOne({ username });
    if (result) {
      return res.send({
        message: "enter another user name",
        flag: 1,
      });
    } else {
      user2.save();
      return res.send({
        message: "Done",
        flag: 0,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const flag = 0;
    let result = await client.findOne({ username });
    if (result) {
      const auth = await bcrypt.compare(password,result.password);
      if (!auth) {
        res.send({
          message: "Invalid password",
          flag: 3,
        });
        return;
      } else {
        const token = jwt.sign({
          user : result.username,
          flag : 1
        },secret,
        {expiresIn: age});
        res.send({
          message: "Login_Client",
          result,
          flag: 1,
          token
        });
        return;
      }
    } else {
      result = await lancer.findOne({ username });
      if (result) {
        const auth = await bcrypt.compare(password,result.password);
        if (!auth) {
          res.send({
            message: "Invalid password",
            flag: 3,
          });
          return;
        }
        const token = jwt.sign({
          user : result.username,
          flag : 2,
        },secret,
       {expiresIn : age});
        res.send({
          message: "Login_lancer",
          result,
          flag: 2,
          token
        });
        return;
      } else {
        res.send({
          message: "Please enter a valid username",
          flag: 3,
        });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;