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
async function ExTheOne(cfile) {
  try {
    console.log(cfile)
      const { stdout, stderr } = await exec("./a.sh "+cfile);
      //console.log('stdout:', stdout);

  }catch (err) {
     //console.error(err);
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
  console.log('here')
  let count=0;
  let fus;

  console.log('hiri')

  for (let i=0; i<req.body.length; i++){
    let ifile= i+1;
    fs.writeFile('./the-one/'+ifile+'.txt', "Scenario.name = " + ifile + "\n" + "Scenario.endTime = " + req.body[i].sTime + "\n" + "btInterface.transmitSpeed = " + req.body[i].tSpeed + "\n" +
    "btInterface.transmitRange = " + req.body[i].tRange + "\n" +
    "Group.nrofHosts = " + req.body[i].gHosts + "\n" + "Group.bufferSize = " + req.body[i].gBuffer + "\n" + "Group.waitTime = " + req.body[i].wTime + "\n" +
    "Group.msgTtl = " + req.body[i].gTTL + "\n" + "Group.speed = " + req.body[i].gSpeed + "\n" +
    "MovementModel.worldSize = " + req.body[i].wSize + "\n" + "Events1.interval = " + req.body[i].mInterval + "\n" + "Events1.size = " + req.body[i].mSize, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
      let a = String(ifile+'.txt')
      setTimeout(()=> {
      ExTheOne(ifile+'.txt')
    },1000*i)


      });
  }

  console.log('hiri')

  let lcount= 2*req.body.length


  setTimeout(()=> {

    for (let i=0; i<req.body.length; i++) {
      let irep = i+1;
      let messageStats = "/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/1/"+irep+"_MessageStatsReport.txt";
      let contactTimeReports = "/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/1/"+irep+"_ContactTimesReport.txt";

      //ExTheOne(req.body.length);
      console.log(`Watching for file changes on ${messageStats}`);
      console.log(lcount)

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
          console.log("---------------------------------------------------------------------------------------------")
          console.log(count)
          console.log("---------------------------------------------------------------------------------------------")
          console.log(lcount)
          console.log("---------------------------------------------------------------------------------------------")

          if (count >= lcount) {
            fus = fus + '\n' + '\n' +messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
            res.json(fus);
          } else {
            if (count == 1)
              fus=messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
            else
              fus=fus+'\n'+'\n'+messageStats+'\n'+fs.readFileSync(messageStats, "utf8")

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
            //fs.readFileSync(contactTimeReports, "utf8")
            );

            count=count+1;
            console.log("---------------------------------------------------------------------------------------------")
            console.log(count)
            console.log("---------------------------------------------------------------------------------------------")
            console.log(lcount)
            console.log("---------------------------------------------------------------------------------------------")

            if (count >= lcount) {
              fus = fus + '\n' + '\n' +contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")
              res.json(fus);
            } else {
              if (count == 1)
                fus=contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")
              else
                fus=fus+'\n'+'\n'+contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")

            }
        }

        });
      }



  },2000*(10))




});




//Begin routing

//creating an HTTP server.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
