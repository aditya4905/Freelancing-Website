const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
// routes
const chat = require("./routes/chats")
const devroutes = require("./routes/developers")
const loginroutes = require('./routes/login');
const signuproutes = require('./routes/signupall');
const raterouter = require('./routes/rate')
const getprojectroutes = require('./routes/getproject');
const updateprofileroutes = require('./routes/updateprofile');
const myprofileroutes = require('./routes/myprofile');
const authroutes = require('./routes/authroutes');
const notificationroutes = require('./routes/notifroutes');
app.listen(5000, function () {
  console.log("Listening on port 5000");
});
const url =
  "mongodb+srv://malay:1234@cluster0.t0pj9ge.mongodb.net/tt?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(express.json());
app.use(authroutes);
app.use(signuproutes);
app.set("views", "src");
app.use(chat);
app.use(loginroutes);
app.use(raterouter);
app.use(updateprofileroutes);
app.use(getprojectroutes);
app.use(devroutes);
app.use(myprofileroutes);
app.use(notificationroutes);
app.post('/decode',(req,res)=>{
  jwt.verify(req.body.token,'mango',(err,decoded)=>{
    if(err){
      res.send({
        user : null,
        flag : null
      })
    }
    else{
      res.send({
        decoded
      });
    }
  
  })
})