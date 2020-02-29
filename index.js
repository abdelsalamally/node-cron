
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const schedule = require('node-schedule');
 const automation = require("./autoemail");


var port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send({ msg: " Welcome to Africase email server dope" });
});


app.post("/autoemail", async (req, res) => {
    console.log("stored automation");
     const {minutes,hours,day,month,receiver,sender,subject,html} = req.body;
     
  
  try{
    const resback =   await automation.scheduleJob(minutes,hours,day,month,receiver,sender,subject,html);
      res.send(resback);
  }
  catch(error)
  {
res.status(500).send({ msg: "Internal Server Error try again." });
  }
  
  });



app.post("/sendemail", (req, res) => {
    console.log("request sent");
  
   sendMail(user, info => {
    console.log(`The mail has been sent 😃`);
    res.send(info);
     job.cancel();
    
  });

  });

   function sendMail(user, callback) {

    var SENDGRID_APY_KEY = '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';

    sgMail.setApiKey(SENDGRID_APY_KEY);
    const msg = {
      to: [user.receiver,'abdelsalami2016@gmail.com'],
      from: user.sender,
      subject: user.subject,
      text: 'Africase Copyright 2019',
      html: user.html,
    };
   let info =  sgMail.send(msg);

   callback(info);

  }
  app.listen(port, () => console.log("app is listening on port 5000"));
