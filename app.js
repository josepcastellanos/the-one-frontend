const express = require('express');
const session = require('express-session');
const path = require('path');
const util = require('util');
const router =express.Router();







//exec using promises for asyncronous execution of the-one
const exec = util.promisify(require('child_process').exec);

const fs = require('fs');
require('log-timestamp');


const messageStats = '/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/default_scenario_MessageStatsReport.txt';
const contactTimeReports = '/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/reports/default_scenario_ContactTimesReport.txt';

const configFile = '/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/default_settings.txt'



//async exxecution of the-one
async function ExTheOne(cfile, ifile) {
  try {

    console.log(cfile)
      const { stdout, stderr } = await exec("./a.sh "+cfile);
      console.log('stdout:', stdout);
      return ifile

  }catch (err) {
     console.error(err);
  };
};

function rep(n, arr){
  let count=0

  for (let i=0; i< arr.length; i++){
    if(Object.keys(arr[i])==n){
      count=count+1
    }
  }
  return count
}




function bTCombinations(i, n, arr, aux, ConfigRes) {

  let nrep=0
  let count=0

  if (arr.length==0){
    return ConfigRes
  } else if(aux.length==0) {
    nrep=rep(String(Object.keys(arr[i])), arr)

    while(count<nrep){

      aux.push(arr[i])
      ConfigRes=bTCombinations(i, Object.keys(arr[i]), arr, aux, ConfigRes)
      aux.pop()
      i=i+1
      count=count+1
    }
    return ConfigRes
  } else {
    let found=false
    while (!found){
      if (i==arr.length){
        console.log("Aux:")
        console.log(aux)
        ConfigRes.push(Object.values(aux))
        console.log("Res:")
        console.log(ConfigRes)

        return ConfigRes
      }
      if (n==String(Object.keys(arr[i]))){
        i=i+1
      } else {
        found=true
      }
    }
    nrep=rep(String(Object.keys(arr[i])), arr)
    while(count<nrep){
      aux.push(arr[i])
      ConfigRes=bTCombinations(i, Object.keys(arr[i]), arr, aux, ConfigRes)
      aux.pop()
      i=i+1
      count=count+1
    }
    return ConfigRes
  }
  return ConfigRes
}






//creating thread for the web routing
const app = express()
const port = 3000

//default configurations
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//initial routing, home page with the-one start button
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

app.get("/", (req,res)=> {
  res.sendFile(__dirname + '/home.html');
});

app.post("/par", (req,res)=> {
  res.sendFile(__dirname + '/par.html');
});

app.post("/bulk", (req,res)=> {
  res.sendFile(__dirname + '/bulk.html');
});



//routing when the-one button is pressed
app.post("/Start", (req,res)=> {
  console.log('here')
  console.log(req.body)
  console.log('here')
  let count=0;
  let fus;
  let a=0;

  console.log('hiri')

  for (let i=0; i<req.body.length; i++){
    let ifile= i+1;
    if (req.body[i].traces == "None") {


          fs.writeFile('./the-one/'+ifile+'.txt', "Scenario.name = " + ifile + "\n" + "Scenario.endTime = " + req.body[i].sTime + "\n" + "btInterface.transmitSpeed = " + req.body[i].tSpeed + "\n" +
          "btInterface.transmitRange = " + req.body[i].tRange + "\n" + "Group.router = " + req.body[i].Grout + "\n" +
          "Group.nrofHosts = 60" + "\n" + "Group.bufferSize = " + req.body[i].gBuffer + "\n" + "Group.waitTime = " + req.body[i].wTime + "\n" +
          "Group.msgTtl = " + req.body[i].gTTL + "\n" + "Group.speed = " + req.body[i].gSpeed + "\n" +
          "MovementModel.worldSize = " + req.body[i].wSize + "\n" + "Events1.interval = " + req.body[i].mInterval + "\n" + "Events1.size = " + req.body[i].mSize + "\n" + "Scenario.nrofHostGroups = " + req.body[i].nGroups + "\n" +
          "Events1.hosts = 0," + req.body[i].gHosts + "\n" + "Group1.groupID = " + req.body[i].G1_ID + "\n" + "Group1.nrofHosts = " + req.body[i].G1_nH + "\n" + "Group1.movementModel = MapRouteMovement" + "\n" +
          "Group1.routeFile = " + req.body[i].G1_rF + "\n" + "Group1.routeType = " + req.body[i].G1_rT + "\n" + "Group2.groupID = " + req.body[i].G2_ID + "\n" + "Group2.nrofHosts = " + req.body[i].G2_nH + "\n" + "Group2.movementModel = MapRouteMovement" + "\n" +
          "Group2.routeFile = " + req.body[i].G2_rF + "\n" + "Group2.routeType = " + req.body[i].G2_rT + "\n" + "Group3.groupID = " + req.body[i].G3_ID + "\n" + "Group3.nrofHosts = " + req.body[i].G3_nH + "\n" + "Group3.movementModel = MapRouteMovement" + "\n" +
          "Group3.routeFile = " + req.body[i].G3_rF + "\n" + "Group3.routeType = " + req.body[i].G3_rT, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
    } else {
          fs.writeFile('./the-one/'+ifile+'.txt', "Scenario.name = " + ifile + "\n" + "Scenario.endTime = " + req.body[i].sTime + "\n" + "btInterface.transmitSpeed = " + req.body[i].tSpeed + "\n" +
          "btInterface.transmitRange = " + req.body[i].tRange + "\n" +
          "Group.nrofHosts = 60"  + "\n" + "Group.bufferSize = " + req.body[i].gBuffer + "\n" + "Group.waitTime = " + req.body[i].wTime + "\n" +
          "Group.msgTtl = " + req.body[i].gTTL + "\n" + "Group.speed = " + req.body[i].gSpeed + "\n" +
          "MovementModel.worldSize = " + req.body[i].wSize + "\n" + "Events1.interval = " + req.body[i].mInterval + "\n" + "Events1.size = " + req.body[i].mSize + "\n" + "Scenario.simulateConnections = false \nGroup.movementModel = StationaryMovement \nGroup.nodeLocation = 0,1 \nEvents.nrof = 2 \nEvents2.class = ExternalEventsQueue \nReport.nrofReports = 1 \nEvents2.filePath = /home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/traces/"+ req.body[i].traces
          + "\n" + "Events1.nrofPreload = " + req.body[i].PreL + "\n" + "Scenario.nrofHostGroups = " + req.body[i].nGroups + "\n" +
          "Events1.hosts = 0," + req.body[i].gHosts + "\n" + "Group1.groupID = " + req.body[i].G1_ID + "\n" + "Group1.nrofHosts = " + req.body[i].G1_nH + "\n" + "Group2.groupID = " + req.body[i].G2_ID + "\n" + "Group2.nrofHosts = " + req.body[i].G2_nH + "\n" + "Group3.groupID = "
          + req.body[i].G3_ID + "\n" + "Group3.nrofHosts = " + req.body[i].G3_nH, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
    }



    setTimeout(()=> {

        ExTheOne(ifile+'.txt', ifile).then(irep=> {
          a=a+1
          let messageStats = "/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/"+irep+"_MessageStatsReport.txt";
          let contactTimeReports = "/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/reports/"+irep+"_ContactTimesReport.txt";
          if (a >= req.body.length) {
            fus = fus + '\n' + '\n' +messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
            fus = fus + '\n' + '\n' +contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")
            res.json(fus);
            console.log("HOGRIDEEER")
          } else {
            if (a == 1) {
              fus=messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
              fus = fus + '\n' + '\n' +contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")
            }
            else {
              fus=fus+'\n'+'\n'+messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
              fus = fus + '\n' + '\n' +contactTimeReports+'\n'+fs.readFileSync(contactTimeReports, "utf8")
            }
          }

        })
        //console.log(a)
      },1000*ifile)
  }

  console.log('hiri')

  let lcount= 2*req.body.length

  /**
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



  },2000*(1))
**/



});

app.post("/GenConfig", (req,res)=> {
  console.log('here')
  console.log(req.body)
  console.log('here')
  let count=0;
  let fus;
  let a=0;

  console.log('hiri')

  for (let i=0; i<req.body.length; i++){
    let ifile= i+1;
    if (req.body[i].traces == "None") {


          fs.writeFile('./the-one/'+ifile+'.txt', "Scenario.name = " + ifile + "\n" + "Scenario.endTime = " + req.body[i].sTime + "\n" + "btInterface.transmitSpeed = " + req.body[i].tSpeed + "\n" +
          "btInterface.transmitRange = " + req.body[i].tRange + "\n" + "Group.router = " + req.body[i].Grout + "\n" +
          "Group.nrofHosts = 60" + "\n" + "Group.bufferSize = " + req.body[i].gBuffer + "\n" + "Group.waitTime = " + req.body[i].wTime + "\n" +
          "Group.msgTtl = " + req.body[i].gTTL + "\n" + "Group.speed = " + req.body[i].gSpeed + "\n" +
          "MovementModel.worldSize = " + req.body[i].wSize + "\n" + "Events1.interval = " + req.body[i].mInterval + "\n" + "Events1.size = " + req.body[i].mSize + "\n" + "Scenario.nrofHostGroups = " + req.body[i].nGroups + "\n" +
          "Events1.hosts = 0," + req.body[i].gHosts + "\n" + "Group1.groupID = " + req.body[i].G1_ID + "\n" + "Group1.nrofHosts = " + req.body[i].G1_nH + "\n" + "Group1.movementModel = MapRouteMovement" + "\n" +
          "Group1.routeFile = " + req.body[i].G1_rF + "\n" + "Group1.routeType = " + req.body[i].G1_rT + "\n" + "Group2.groupID = " + req.body[i].G2_ID + "\n" + "Group2.nrofHosts = " + req.body[i].G2_nH + "\n" + "Group2.movementModel = MapRouteMovement" + "\n" +
          "Group2.routeFile = " + req.body[i].G2_rF + "\n" + "Group2.routeType = " + req.body[i].G2_rT + "\n" + "Group3.groupID = " + req.body[i].G3_ID + "\n" + "Group3.nrofHosts = " + req.body[i].G3_nH + "\n" + "Group3.movementModel = MapRouteMovement" + "\n" +
          "Group3.routeFile = " + req.body[i].G3_rF + "\n" + "Group3.routeType = " + req.body[i].G3_rT, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
    } else {
          fs.writeFile('./the-one/'+ifile+'.txt', "Scenario.name = " + ifile + "\n" + "Scenario.endTime = " + req.body[i].sTime + "\n" + "btInterface.transmitSpeed = " + req.body[i].tSpeed + "\n" +
          "btInterface.transmitRange = " + req.body[i].tRange + "\n" +
          "Group.nrofHosts = 60"  + "\n" + "Group.bufferSize = " + req.body[i].gBuffer + "\n" + "Group.waitTime = " + req.body[i].wTime + "\n" +
          "Group.msgTtl = " + req.body[i].gTTL + "\n" + "Group.speed = " + req.body[i].gSpeed + "\n" +
          "MovementModel.worldSize = " + req.body[i].wSize + "\n" + "Events1.interval = " + req.body[i].mInterval + "\n" + "Events1.size = " + req.body[i].mSize + "\n" + "Scenario.simulateConnections = false \nGroup.movementModel = StationaryMovement \nGroup.nodeLocation = 0,1 \nEvents.nrof = 2 \nEvents2.class = ExternalEventsQueue \nReport.nrofReports = 1 \nEvents2.filePath = /home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/traces/"+ req.body[i].traces
          + "\n" + "Events1.nrofPreload = " + req.body[i].PreL + "\n" + "Scenario.nrofHostGroups = " + req.body[i].nGroups + "\n" +
          "Events1.hosts = 0," + req.body[i].gHosts + "\n" + "Group1.groupID = " + req.body[i].G1_ID + "\n" + "Group1.nrofHosts = " + req.body[i].G1_nH + "\n" + "Group2.groupID = " + req.body[i].G2_ID + "\n" + "Group2.nrofHosts = " + req.body[i].G2_nH + "\n" + "Group3.groupID = "
          + req.body[i].G3_ID + "\n" + "Group3.nrofHosts = " + req.body[i].G3_nH, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
    }


  }
  res.json(fus)

  console.log('hiri')

  let lcount= 2*req.body.length

});

app.post('/downloadRep',(req, res)=>{
  console.log(req.body.number)
  let config=fs.readFileSync("/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/reports/"+ req.body.number+"_MessageStatsReport.txt", "utf8")
  res.json(config)
});

app.post('/downloadConfig', (req, res)=>{
  /**
  const file = '/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/1.txt';
  res.download(file, '1.txt', (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      }); // Set disposition and send it.
    }
    });
    **/
    if (req.body.number=="all"){
      let config="[Simulation Config 1] \n" + fs.readFileSync("/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/1.txt", "utf8") + "\n \n" ;
      for (let i = 1; i<req.body.total; i++){
        let fl=i+1;
        config= config + "[Simulation Config " + fl + "] \n" + fs.readFileSync("/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/"+ fl +".txt", "utf8") + "\n \n";
      }
      res.json(config)
    } else {
      console.log(req.body.number)
      let config=fs.readFileSync("/home/jus/Desktop/TFG/wha/A/the-one-frontend/the-one/"+ req.body.number+".txt", "utf8")
      res.json(config)
    }
  //console.log(req.body.length)

});


app.post("/StartB", (req,res)=> {
  let fus;
  let zer
  let a=0;
  console.log('here')
  console.log(req.body)
  console.log('here')
  console.log('hiri')

  let x=[]
  let y=[]

  const GenerateConfig = async () => {
  let aux=[]
  const ConfigRes = await bTCombinations(0,0,req.body,x,y, aux)
  return ConfigRes;
}


GenerateConfig().then((ConfigRes)=>{
  console.log("----------------------------")
  //console.log(ConfigRes)
  let pos=1

  if (ConfigRes.length>4){
    pos=Math.floor(ConfigRes.length/4)
  }
  console.log(pos)
  //pos es la suma
  let numConfigs=[]
  for (let x=0; x<ConfigRes.length; x+=pos){
    numConfigs.push(x)
  }
  console.log(numConfigs)

  for(let i=0; i<numConfigs.length; i++){
  let ifile=i+1

  console.log(ifile)

    let insertConfig="Scenario.name = " + ifile + "\n"

    for(let n=0; n<(ConfigRes[numConfigs[i]].length); n++){
      ky=Object.keys(ConfigRes[numConfigs[i]][n])
      insertConfig=insertConfig + ky + " = " + ConfigRes[numConfigs[i]][n][ky] + "\n"
    }

    console.log(insertConfig)


    fs.writeFile('./the-one/'+ifile+'.txt', insertConfig, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });

      setTimeout(()=> {

          ExTheOne(ifile+'.txt', ifile).then(irep=> {
            a=a+1
            let messageStats = "/home/jus//Desktop/TFG/wha/A/the-one-frontend/the-one/reports/"+irep+"_MessageStatsReport.txt";

            if (a >= numConfigs.length) {
              fus = fus + '\n' + '\n' +messageStats+'\n'+fs.readFileSync(messageStats, "utf8")

              res.json(fus);
              console.log("HOGRIDEEER")
            } else {
              if (a == 1) {
                fus=messageStats+'\n'+fs.readFileSync(messageStats, "utf8")
              }
              else {
                fus=fus+'\n'+'\n'+messageStats+'\n'+fs.readFileSync(messageStats, "utf8")

              }
            }

          })
          //console.log(a)
        },1000*ifile)

  }




})


});

app.post("/GenBulkConfig", (req,res)=> {
  let fus;
  let zer
  let a=0;
  console.log('here')
  console.log(req.body)
  console.log('here')
  console.log('hiri')

  let x=[]
  let y=[]

  const GenerateConfig = async () => {
  let aux=[]
  const ConfigRes = await bTCombinations(0,0,req.body,x,y, aux)
  return ConfigRes;
}


GenerateConfig().then((ConfigRes)=>{
  console.log("----------------------------")
  //console.log(ConfigRes)
  let pos=1

  if (ConfigRes.length>4){
    pos=Math.floor(ConfigRes.length/4)
  }
  console.log(pos)
  //pos es la suma
  let numConfigs=[]
  for (let x=0; x<ConfigRes.length; x+=pos){
    numConfigs.push(x)
  }
  console.log(numConfigs)

  for(let i=0; i<numConfigs.length; i++){
  let ifile=i+1

  console.log(ifile)

    let insertConfig="Scenario.name = " + ifile + "\n"

    for(let n=0; n<(ConfigRes[numConfigs[i]].length); n++){
      ky=Object.keys(ConfigRes[numConfigs[i]][n])
      insertConfig=insertConfig + ky + " = " + ConfigRes[numConfigs[i]][n][ky] + "\n"
    }

    console.log(insertConfig)


    fs.writeFile('./the-one/'+ifile+'.txt', insertConfig, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
    });

  }

  res.json(numConfigs.length)




})


});

app.post('/CalcNsim', (req, res)=>{
  let fus;
  let zer
  let a=0;
  console.log('here')
  console.log(req.body)
  console.log('here')
  console.log('hiri')

  let x=[]
  let y=[]

  const GenerateConfig = async () => {
  let aux=[]
  const ConfigRes = await bTCombinations(0,0,req.body,x,y, aux)
  return ConfigRes;
}


GenerateConfig().then((ConfigRes)=>{
  console.log("----------------------------")
  //console.log(ConfigRes)
  let pos=1

  if (ConfigRes.length>4){
    pos=Math.floor(ConfigRes.length/4)
  }
  console.log(pos)
  //pos es la suma
  let numConfigs=[]
  for (let x=0; x<ConfigRes.length; x+=pos){
    numConfigs.push(x)
  }
  console.log(numConfigs)
  res.json(numConfigs.length)
})

});




//Begin routing

//creating an HTTP server.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
