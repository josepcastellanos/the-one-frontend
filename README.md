# the-one-frontend

## Installation
A front-end for the-one simulator created using vue.js (front-end) and express.js (backend)

Download the-one simulator in this carpet, and modify one.sh as follows:

'#! /bin/sh'

'java -Xmx512M -cp /your_path/target:/your_path/lib/ECLA.jar:/your_path/lib/DTNConsoleConnection.jar core.DTNSim $*'

Install node.js
Also, install the necessaries node modules with npm install (express, path, util, log-timestamp).


## Front End

Located in 'the-one-frontend/js/components.js' .


## Back End

Located in '/the-one-frontend/app.js' .


## a.sh

Script in charge of executng the-one sumulator


## Done

21/02/2022 -> Button that executes a default the-one simulation without GUI and the reports are stored in the back-end, the reports can be shown with console.log.

24/02/2022 -> Raw reports shown in the web page, problems with listening two reports files, and sending one single response when reports are generated. watchFile                   function to listen the files, and join both reports in json format.

28/02/2022 -> Form with the simulation parameters, they are stored in the data of the root vue.js component named OneConfig.

01/03/2022 -> "Fetch Start" message to the back changed from get to post, so now we are able to send the simulation config to the back-end.

02/03/2022 -> Now the simulation parameters are applied using the fs.writefile (removeLines) to clean the configuration parameters, and fs.appendFile to add the new simulation configuration to apply.

10/02/2022 -> More moddularity, the form is now a component, so now its possible to select a number of simulations (8 max), and all the parameters are stored dynamically in an array of OneConfig, at the moment is not possible to send this data structure to the back, the next step is to fix this.

17/03/2022 -> Now the simulations are launched deppending on the form, and the report listeing system lets show the results. This system is not optimized.

20/03/2022 -> Report system updated, now is implemented with a callback function that executes theOne simulations, now we have less loops and the code in the back has been reduced a lot.

26/03/2022 -> Traces as parameters implemented, but the correct params to run the simulation are unknown, a functionallity decision has to be taken.

03/04/2022 -> Group simulation params have been included on the simulation form, group configuration improved, now its possible to select the number of groups, up to 3, and u can select the number of hosts, the movement model and range of the group Performed adding the params to the params data structure in the front, and sending it to the front, changing the config file structure to accept the group params.

10/04/2022 -> Traces as parameters correctly implemented, Taxi trace only works with 304 hosts and reality trace only works with more than 100 hosts.

## Done Checklist

- [x]  Capture reports, for one simulation (at first)(Listen changes in one/reports/) -> DONE using watchfile (fs library) and the node-module log-timestamps
- [x]  Pass the reports to the front-end.
- [x]  Parameters, such as TTL, bandwindth,…
- [x]       Parameters/Create form simulation config
- [x]       Parameters/Pass the config to the back
- [x]       Parameters/Change the txt (replace config)
- [x]       Parameters/Check it works



## To do

- [x]  Add simulation number to the simulation config form
- [x]  Manage report system
- [x]  Optimized report system
- [x]  Traces as parameters
- [x]  Group params included in the simulation form
- [x]  Trace simulations with correct params
- [x]  Decide final simulation form
- [ ]  Download reports and config file
- [ ]  Formating reports(later on)
- [ ]  Bulk simulation
- [ ] Home page to select parameter simulation or bulk simulations



## Possible improvements

- [x] Optimize the report listening system
- [ ] Add config parameters to the simulation
- [ ] Optimize the change simulation config parameters
- [ ] Change the form number with a v-for system
- [ ] Change the form distribution, vertial each form instead of horizontal.
- [ ] Test all sim cases.
