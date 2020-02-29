const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const schedule = require('node-schedule');

const automation={

    scheduleJob: async (minutes,hours,day,month,receiver,sender,subject,html) =>{
        var job = await schedule.scheduleJob(`00 ${minutes} ${hours} ${day} ${month} *`, function(){
               
            //    job.cancel();

                sendMail(receiver,sender,subject,html, info => {
                console.log(`The mail has been sent 😃`);
               // res.send(info);
                });
      
        })
        console.log(job);
        
    }

  




};

async function sendMail(receiver,sender,subject,html,callback) {

    var SENDGRID_APY_KEY = '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';

    sgMail.setApiKey(SENDGRID_APY_KEY);
    const msg = {
      to: [receiver,'abdelsalami2016@gmail.com'],
      from: sender,
      subject: subject,
      text: 'Africase Copyright 2019',
      html: html,
    };
   let info = await sgMail.send(msg);

   callback(info);

  }

module.exports = automation;