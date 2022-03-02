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

const configFile = '/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/default_settings.txt'



//async exxecution of the-one
async function ExTheOne() {
  try {
      const { stdout, stderr } = await exec('./a.sh');
      console.log('stdout:', stdout);

  }catch (err) {
     console.error(err);
  };
};

//remove-line function
const removeLines = (data, lines = []) => {
  return data
      .split('\n')
      .filter((val, idx) => lines.indexOf(idx) === -1)
      .join('\n');
}


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
app.post("/Start", (req,res)=> {
  console.log('here')
  console.log(req.body)
  console.log(req.body.sTime)
  console.log('here')
  let count=0;
  let fus;

  //change configuration here
  //DELETE LINES 183-194

fs.readFile(configFile, 'utf8', (err, data) => {
    if (err) throw err;

    // remove the first line and the 5th and 6th lines in the file
    fs.writeFile(configFile, removeLines(data, [180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194]), 'utf8', function(err) {
        if (err) throw err;
        console.log("the lines have been removed.");
    });

    fs.appendFile(configFile, "\n" + "\n" + "\n" + "Scenario.endTime = " + req.body.sTime + "\n" + "btInterface.transmitSpeed = " + req.body.tSpeed + "\n" +
    "btInterface.transmitRange = " + req.body.tRange + "\n" +
    "Group.nrofHosts = " + req.body.gHosts + "\n" + "Group.bufferSize = " + req.body.gBuffer + "\n" + "Group.waitTime = " + req.body.wTime + "\n" +
    "Group.msgTtl = 300" + "\n" + "Group.speed = 0.5, 1.5" + "\n" +
    "MovementModel.worldSize = " + req.body.wSize + "\n" + "Events1.interval = " + req.body.mInterval + "\n" + "Events1.size = " + req.body.mSize, 'utf8', function(err) {
        if (err) throw err;
        console.log("the config has changed");
    });
})

  //ADD LINES
  /*
  Scenario.endTime = 43200
  btInterface.transmitSpeed = 250k
  btInterface.transmitRange = 10
  Group.nrofHosts = 40
  Group.bufferSize = 5M
  Group.waitTime = 0, 120
  Group.msgTtl = 300
  Group.speed = 0.5, 1.5
  MovementModel.worldSize = 4500, 3400
  Events1.interval = 25,35
  Events1.size = 500k,1M
  */

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
