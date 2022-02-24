const express = require('express');
const session = require('express-session');
const path = require('path');
const util = require('util');
//exec using promises for asyncronous execution of the-one
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');
require('log-timestamp');

const messageStats = '/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/default_scenario_MessageStatsReport.txt';
const contactTimeReports = '/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/default_scenario_ContactTimesReport.txt';




//async exxecution of the-one
async function ExTheOne() {
  try {
      const { stdout, stderr } = await exec('./a.sh');
      console.log('stdout:', stdout);

  }catch (err) {
     console.error(err);
  };
};

//creating thread for the web routing
const app = express()
const port = 3000

//default configurations
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//initial routing, home page with the-one start button
app.get("/", (req,res)=> {

  res.sendFile(path.join(__dirname,'index.html'));

});

//routing when the-one button is pressed
app.get("/Start", (req,res)=> {

  let count=0;
  let fus;

  ExTheOne();
  console.log(`Watching for file changes on ${messageStats}`);

  fs.watchFile(messageStats, (curr, prev) => {
    console.log(`${messageStats} file Changed`);
    if (fs.readFileSync(messageStats, "utf8") === "") {
      console.log('empty')
      console.log(count)
    } else {
      console.log(
        "The contents of the messageStats file are:",
        fs.readFileSync(messageStats, "utf8")
      );

      count=count+1;

      if (count >= 2) {
        fus = fus + fs.readFileSync(messageStats, "utf8")
        res.json(fus);
      } else {
        fus=fs.readFileSync(messageStats, "utf8")
      }

    }


  });

  fs.watchFile(contactTimeReports, (curr, prev) => {
    console.log(`${contactTimeReports} file Changed`);

    if (fs.readFileSync(contactTimeReports, "utf8") === "") {
      console.log('empty')
      console.log(count)
    } else {
      console.log(
        "The contents of the contactTimeReports file are:",
        fs.readFileSync(contactTimeReports, "utf8")
        );

        count=count+1;

        if (count >= 2) {
          fus = fus + fs.readFileSync(contactTimeReports, "utf8")
          res.json(fus);
        } else {
          fus=fs.readFileSync(contactTimeReports, "utf8")

        }
    }

    });

});




//Begin routing

//creating an HTTP server.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
