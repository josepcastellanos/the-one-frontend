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


## To do 03/03/2022

- [x]  Capture reports, for one simulation (at first)(Listen changes in one/reports/) -> DONE using watchfile (fs library) and the node-module log-timestamps
- [x]  Pass the reports to the front-end.
- [x]  Parameters, such as TTL, bandwindth,…
- [x]       Parameters/Create form simulation config
- [x]       Parameters/Pass the config to the back
- [x]       Parameters/Change the txt (replace config)
- [x]       Parameters/Check it works



## To do next

- [ ]  Add simulation number to the simulation config form
- [ ]  Manage report system
- [ ]  Traces as parameters
- [ ]  Split/Total
            Split: input parameter is a time range
            Total: Trace
- [ ]  Formating reports(later on)


## Possible improvements

Optimize the report listening system

Add config parameters to the simulation

Optimize the change simulation config parameters
