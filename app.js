const express = require('express');
const session = require('express-session');
const path = require('path');
const util = require('util');
//exec using promises for asyncronous execution of the-one
const exec = util.promisify(require('child_process').exec);

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

  ExTheOne();

});




//Begin routing

//creating an HTTP server.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
