# The One frontend

## Installation
A front-end for the-one simulator created using Vue.js (front-end) and express.js (Middle-ware).

Download the-one simulator in this carpet, and modify one.sh as follows:

'#! /bin/sh'

'java -Xmx512M -cp /your_path/target:/your_path/lib/ECLA.jar:/your_path/lib/DTNConsoleConnection.jar core.DTNSim $*'

Install node.js
Also, install the necessaries node modules with npm install (express, path, util, log-timestamp).


## Front End

Located in 'the-one-frontend/js/' .



## Middleware

Located in '/the-one-frontend/app.js' .


## a.sh

Script in charge of executing the-one simulator.


## Activate Server mode

To activate the server mode, which means to remove all limitations regarding the execution of bulk simulations, the following few changes are necessary:

1. _/public/js/bulk.js_ -> set the "maxOpt" variable to the maximum possible variables to select (maximum default is 52).

2. _/app.js_ -> comment the 422-425 lines (code that divides per 4 the "ConfigRes.length"). Also, for download configurations, comment the same part at the "GenBulkConfig", lines 535-527.


## Done

21/02/2022 -> Button that executes a default the-one simulation without GUI and the reports are stored in the middle-ware, the reports can be shown with console.log.

24/02/2022 -> Raw reports shown in the web page, problems with listening two reports files, and sending one single response when reports are generated. WatchFile                  function to listen the files, and join both reports in JSON format.

28/02/2022 -> Form with the simulation parameters, they are stored in the data of the root Vue.js component named OneConfig.

01/03/2022 -> "Fetch Start" message to the middle changed from get to post, so now we are able to send the simulation Config to the middle-ware.

02/03/2022 -> Now the simulation parameters are applied using the fs.writefile (removeLines) to clean the configuration parameters, and fs.appendFile to add the new simulation configuration to apply.

10/02/2022 -> More modularity, the form is now a component, so now its possible to select a number of simulations (8 max), and all the parameters are stored dynamically in an array of OneConfig, at the moment is not possible to send this data structure to the middle, the next step is to fix this.

17/03/2022 -> Now the simulations are launched depending on the form, and the report listening system lets show the results. This system is not optimized.

20/03/2022 -> Report system updated, now is implemented with a callback function that executes theOne simulations, now we have less loops and the code in the middle has been reduced a lot.

26/03/2022 -> Traces as parameters implemented, but the correct parameters to run the simulation are unknown, a functionality decision has to be taken.

03/04/2022 -> Group simulation parameters have been included on the simulation form, group configuration improved, now its possible to select the number of groups, up to 3, and u can select the number of hosts, the movement model and range of the group Performed adding the parameters to the parameters data structure in the front, and sending it to the front, changing the configuration file structure to accept the group parameters.

10/04/2022 -> Traces as parameters correctly implemented, Taxi trace only works with 304 hosts and reality trace only works with more than 100 hosts.

14/04/2022 -> It is possible to select the report and configuration file of each simulation to download.

16/04/2022 -> Formulary distribution changed, now the interface is more friendly.

29/04/2022 -> Charts creation implemented with frappe Chart Vue.js component.

02/05/2022 -> Home page and corresponding routing system implemented, two main options, new bulk simulation, and terminated parameter simulation.

04/05/2022 -> Popup menu added when starting a simulation, 3 options, cancel, download (modified download function in middle and front, so u can download before and after a simulation) or simulate, done with html div v-if.

04/05/2022 -> Now it's possible to select the routing algorithm for each simulation, in both parameters and bulk simulation mode.

08/05/2022 -> Bulk middle-ware finished, the combinations are made with a backtracking function bTCombinations(), that goes over a tree, generating all the combinations, only /4 Combinations are selected, the configuration file is generated, and then launched by the-one, the results are correctly received in the front.

12/05/2022 -> Bulk pop pre-menu added and implemented, also sample creation bug fixed.

12/05/2022 -> Download Config and Report at the end solved.

06/06/2022 -> CSS format.

## Done Checklist

- [x]  Capture reports, for one simulation (at first)(Listen changes in one/reports/) -> DONE using watchfile (fs library) and the node-module log-timestamps.
- [x]  Pass the reports to the front-end..
- [x]  Parameters, such as TTL, bandwindth,…
- [x]       Parameters/Create form simulation config.
- [x]       Parameters/Pass the config to the middle.
- [x]       Parameters/Change the txt (replace config).
- [x]       Parameters/Check it works.     
- [x]  Add simulation number to the simulation config form.
- [x]  Manage report system.
- [x]  Optimized report system.
- [x]  Traces as parameters.
- [x]  Group parameters included in the simulation form.
- [x]  Trace simulations with correct parameters.
- [x]  Decide final simulation form.
- [x]  Download reports and configuration file.
- [x]  Formatting reports(later on).
- [x]  Popup menu with cancel, download or start simulation.
- [x]  Add routing algorithm to bulk and parameter simulation.
- [x]  Bulk simulation front-end.
- [x]  Bulk simulation middle-ware (sampled).
- [x] Include Confirmation menu to the bulk front-end.
- [x] Add to the readme how to activate Server mode (unlock).
- [x] Home page to select parameter simulation or bulk simulations.



## Possible improvements

- [x] Optimize the report listening system.
- [x] Add config parameters to the simulation.
- [ ] Optimize the change simulation config parameters.
- [ ] Change the form number with a v-for system.
- [x] Change the form distribution, vertical each form instead of horizontal.
- [ ] Test all sim cases.
- [ ] Event file.
- [ ] DB storage.
- [ ] Add wait time options.
- [ ] Pass minutes to hours in group message TTL.
