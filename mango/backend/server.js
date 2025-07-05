const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const http = require("http");
// routes

const devroutes = require("./routes/developers")
const loginroutes = require('./routes/login');
const signuproutes = require('./routes/signupall');
const raterouter = require('./routes/rate')
const getprojectroutes = require('./routes/getproject');
const updateprofileroutes = require('./routes/updateprofile');
const myprofileroutes = require('./routes/myprofile');
const authroutes = require('./routes/authroutes');
const notificationroutes = require('./routes/notifroutes');
const setupRealtimeChat = require("./realtimechat");
const paymentRoutes = require('./routes/payment');

const url =
  "mongodb+srv://Shivam:3wrkC1O2FmdxCpgN@mango.dk09q.mongodb.net/?retryWrites=true&w=majority&appName=mango";
mongoose
  .connect(url)
  .then(() => console.log(`Connected to database: ${mongoose.connection.name}`))
  .catch((error) => console.log(error));

const server = http.createServer(app);
setupRealtimeChat(server);

app.use(cors());
app.use(express.json());
app.use(authroutes);
app.use(signuproutes);
app.set("views", "src");
app.use('/payment', paymentRoutes);
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



app.listen(5000, function () {
  console.log("Listening on port 5000");
});