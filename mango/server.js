const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const lancer = require("./Schema/lancer");
const client = require("./Schema/client");
const project = require("./Schema/project");
const rated = require("./Schema/rated");

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

app.set("views", "src");
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const flag = 0;
    let result = await client.findOne({ username })
      if (result) {
        if (result.password != password) {
          res.send({
            message: "Invalid password",
            flag: 3,
          });
          return ;
        }
       else{
        res.send({
          message: "Login_Client",
          result,
          flag: 1,
        });
        return ;
       } 
      } else {
       result = await lancer.findOne({ username })
          if (result) {
            if (result.password != password) {
              res.send({
                message: "Invalid password",
                flag: 3,
              });
              return ;
            }
              console.log("jiosdfjiosd");

            res.send({
              message: "Login_lancer",
              result,
              flag: 2,
            });
            return ;
          } else {
            res.send({
              message: "Please enter a valid username",
              flag : 3,
            });
            return ;
          }
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
app.post('/rateit', async(req,res)=>{
    try{
        const giver = req.body.user;
        const given = req.body.id;
        const exist =await rated.findOneAndUpdate(
              { client: giver, lancer: given }, // find by this
              { rating2: req.body.rating }, // update this
              { new: false, upsert: true } // 'new' option returns the updated rating, 'upsert' option creates a new document if it doesn't exist
            )
        let minus=0;
        if(exist) minus=exist.rating2;
        const t  = await lancer.findOne(
          {username : given}
        );
        let people_in_lancer = 0;
        if(t.people)people_in_lancer = t.people
        let calc = people_in_lancer * 1.00 *  t.rating;
        calc-=minus;
        calc+=req.body.rating;
        let new_people=people_in_lancer;
        if(!exist) new_people+=1;
        calc/=new_people;
        await lancer.findOneAndUpdate(
          {username : given},
          {rating : calc , people : new_people},
          {upsert : true}
        )
    }
    catch(err)
    {
      console.log(err);
      message : "Not able to rate";
    }
})
app.post("/signup", async (req, res) => {
  const { name, username, password, email, skills } = req.body;

  try {
    const flag = 0;

    const user2 = new lancer({
      name: name,
      username: username,
      password: password,
      email: email,
      skills: skills,
      rating: 0,
      people: 0,
    });

    let result = await client.findOne({ username })
      if (result) {
        res.send({
          message: "enter another user name",
          flag: 1,
        });
      } else {
        result = await lancer.findOne({ username })
          if (result) {
            res.send({
              message: "enter another user name",
              flag: 1,
            });
          } else {
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

app.post("/signupc", async (req, res) => {
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

    result = await client.findOne({ username })
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

app.post("/signupp", async (req, res) => {
  const { name, lancer_id, client_id, description, date,cost } = req.body;
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
    const projectId = p._id;
    let f = await lancer.findOne({ username: lancer_id });
    let t = f._id;
    let updatedLancer = await lancer.findByIdAndUpdate(
      t,
      { $push: { project_ids: projectId } },
      { new: true }
    );
    f = await client.findOne({ username: client_id });
    t = f._id;
    updatedLancer = await client.findByIdAndUpdate(
      t,
      { $push: { project_ids: projectId } },
      { new: true }
    );
    return res.send(
      {
        message:"project added",
      }
    )
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.post("/myprofile/:user", async (req, res) => {
  const url = req.url;
  let id = "";
  for (let i = 0; i < url.length; i++) {
    if (url[i] == "/") id = "";
    else id += url[i];
  }
  const username = id;
  // console.log(username);
  let tem=req.body.client;
  let r;
  if(tem)r = await rated.findOne({ client: tem, lancer: id });
  let rating_given=0;
  if(r)
  { 
    rating_given= r.rating2;
  } 

  try {
    const flag = 0;
    let result = await client.findOne({ username })
      if (result) {
        return res.send({
          flag: 1,
          result,
        });
      }
    result = await lancer.findOne({ username })
      if (result) {
        return res.send({
          flag: 0,
          result,
          rating_given,
        });
      } else {
       return  res.send({
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

app.post("/update", async (req, res) => {
  const { name, username, password, email, skills } = req.body;

  try {
    const flag = 0;
    let result = await lancer.findOneAndDelete({ username })
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
      res.status(500).send({
        message: "Doneee",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.post("/getproject/:id", async (req, res) => {
  const project_id = req.params.id;
  try {
    //   const flag = 0;
    let result = await project.findOne({ _id: project_id })
      return res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.post("/developers/:id", async (req, res) => {
  let id2 = req.params.id;
  // console.log(id2);
  // lancer.find({skills:{$all:['a','b']}}).then((result)=>{
  //   console.log(result);
  // });
  let result = await lancer.find({ skills: id2 })
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
