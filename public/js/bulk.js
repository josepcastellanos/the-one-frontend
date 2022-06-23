const rootComponent  = {
  data(){
    return{
    Premenu: false,
    nGroups: "1",
    dataReport: "Charging",
    maxOpt: "18",
    dis: false,
    pressed: false,
    Dselected: 1,
    Rselected: 1,
    Nsim: {},
    dataG: null,
    Config: {
      "Group.router": ["Group routing algorithm", "ProphetRouter", "EpidemicRouter", "SprayAndWaitRouter", "Epidemic", "0"],
      "Scenario.endTime": ["Simulation Time", "36000", "43200", "54000", "43200 seconds", "0"],
      "btInterface.transmitRange": ["Transmit range", "10", "50", "100", "10 meters", "0"],
      "btInterface.transmitSpeed": ["Transmit speed", "125k", "250k", "650k", "2 Mbps / 250 kBps", "0"],
      "Scenario.nrofHostGroups": ["Number of Groups", "1", "2", "3", "1 Group", "0"],
      "Group1.nrofHosts": ["Number of Hosts Group 1", "60", "80", "100", "60 Hosts", "1"],
      "Group1.routeFile": ["Range Group 1", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "1"],
      "Group2.nrofHosts": ["Number of Hosts Group 2", "60", "80", "100", "60 Hosts", "2"],
      "Group2.routeFile": ["Range Group 2", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "2"],
      "Group3.nrofHosts": ["Number of Hosts Group 3", "60", "80", "100", "60 Hosts", "3"],
      "Group3.routeFile": ["Range Group 3", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "3"],
      "Group.bufferSize": ["Group buffer size", "2M", "5M", "10M", "5 M", "0"],
      /**"Group.waitTime": ["Group wait time", "0, 120", "0, 120", "0, 120", "0 seconds to 120 seconds", "0"],**/
      "Group.msgTtl": ["Group message TTL", "120", "300", "420", "300 minutes", "0"],
      "Group.speed": ["Group walking speed", "0.2, 1.0", "0.5, 1.5", "1.5, 2.5", "0.5 to 1.5 m/sec", "0"],
      "MovementModel.worldSize": ["World size", "4500, 3400", "5625, 4250", "9000, 6800", "4500 x 3400 meters", "0"],
      "Events1.interval": ["Message creation interval", "5, 15", "25, 35", "45, 55", "One new message every 25 to 35 seconds", "0"],
      "Events1.size": ["Message sizes", "125k, 500k", "500k, 1M", "1M, 2M", "500kB - 1MBs", "0"],


  },
  GroupShow: [false, false, false],

  Csim: [],




}
  },
  methods: {
    Charging: function(){
      if (this.pressed==true && this.dataReport=="Charging"){
        return true;
      } else {
        return false
      }
    },
    Confirm: function(){
      this.Premenu=true;
    },
    GroupCheck: function(ngr) {
      if(this.nGroups>ngr){
        return "false";
      } else {
        return "true";

      }
    },
    chData: function(key, data){


        if (key=="Scenario.nrofHostGroups"){
          let n=data-1
          this.GroupShow[n]=!this.GroupShow[n]
          for(let i=0; i<this.GroupShow.length; i++){
            if(this.GroupShow[i]==true){
              this.nGroups=i+1;
            }
          }
          if (!(this.GroupShow.includes(true))){
              this.nGroups=1
          }
        }

        let obj = {};
        obj[key] = data;
        console.log(key)
        console.log(data)
        let dec="add";
        let pos=0;

        if (this.Csim.length===0){
          console.log("aja")
          this.Csim.push(obj)
        } else {
          for (let i=0; i<this.Csim.length; i++) {
            if (this.Csim[i].hasOwnProperty(key) && this.Csim[i][key]==data){
              console.log("!--------------!")
              dec="noadd"
              this.Csim.splice(i, 1)
              i=99999
            }  else if(this.Csim[i].hasOwnProperty(key)){
                pos=i
            }
          }
          if (dec=="add"){
            console.log("------------------")
            this.Csim.splice(pos, 0, obj)
            pos=this.Csim.length
          }

        }

      if(this.maxOpt<this.Csim.length){
        alert("Maximum options selected")
        var cbs = document.getElementsByClassName("cbox");
      for (var i = 0; i < cbs.length; i++) {
        if(cbs[i].checked==false) {
          cbs[i].disabled=true
        }
      }
    } else {
      var cbs = document.getElementsByClassName("cbox");
      for (var i = 0; i < cbs.length; i++) {
          cbs[i].disabled=false
      }
    }





      /**
      this.Csim = this.Csim.map(function(obj) {
        console.log(obj.key)
      });
          let obj = {};
          obj[key] = data;
          this.Csim.push(obj);
      **/


    },
    StartB: function(){
      this.pressed=true;
      this.Premenu=false;
      if (this.Csim.length==0) {
        this.Csim.push({"Scenario.endTime": "43200"})
      }
      const b=JSON.parse(JSON.stringify(this.Csim))
      fetch('/CalcNsim', {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
         },
        body: JSON.stringify(b),
      })
      .then(response => response.json())
      .then(aJson => {

        this.Nsim={total: JSON.stringify(aJson)}


      })
      const a=JSON.parse(JSON.stringify(this.Csim))
      fetch('/StartB', {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
         },
        body: JSON.stringify(a),
      })
      .then(response => response.json())
      .then(aJson => {


        aJson.pop()

        this.dataReport=aJson

        console.log(aJson);

        console.log(aJson.length)
        let data = {
            labels: null,
            datasets: [
                {

                },

            ]
        }
        let time=99999999999999999999999999;
        for (let i=0; i<aJson.length; i++) {
          console.log(aJson[i])
          let resProb=[]
          let resTime=[]
          resProb[i]=aJson[i].map(function(point, index) {
                if (index==0){
                  return 0
                } else if(point!=""){
                  if (point<0){
                    return 0
                  }
                  return point[3]*100
                } else{
                  return
                }
              })

          resTime[i]=aJson[i].map(function(point, index) {
                    if (index==0){
                      return "0"
                    } else if(point!=""){
                      return point[0]
                    } else{
                      return
                    }

                  })
          if(aJson[i].length<time){
            time=aJson[i].length
            data.labels=resTime[i]
          }

          data.datasets[i]=  {
                name: aJson[i][0],
                chartType: "line",
                values: resProb[i]
            }
        }

        this.dataG=data
      })
      console.log(String(this.Nsim.total))
    },
    dConfig: function(all){
      //SELECT DEL REPORT Y CONFIG, Y PEDIR AL BACK ESE CONFIG/REPORT CONTENT, METER EN UNA VARIABLE, Y DESCARGAR ASÍ.
      if (all==1){
        const b=JSON.parse(JSON.stringify(this.Csim))
        fetch('/GenBulkConfig', {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
           },
          body: JSON.stringify(b),
        })
        .then(response => response.json())
        .then(aJson => {

          this.Nsim={number: "all", total: JSON.stringify(aJson)}


        })


      } else {
          console.log(this.Dselected)
          this.Nsim={number: this.Dselected, total: this.Nsim.total}
      }
      if (all==1){
      setTimeout(()=> {
        fetch('/downloadConfig', {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
           },

          body: JSON.stringify(this.Nsim),
        })
        .then(response => response.json())
        .then(aJson => {
          //console.log(aJson)
          var blob = new Blob([ aJson ], { "type" : "text/plain" });
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          if(this.Premenu){
            link.download = 'Configs.txt'
          } else{
            link.download = this.Dselected+'_config.txt'
          }
          link.click()
          this.Premenu=false;
          //this.dataReport=JSON.stringify(aJson);
        })

      }, 500)
    } else {
      setTimeout(()=> {
        fetch('/downloadConfig', {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
           },

          body: JSON.stringify(this.Nsim),
        })
        .then(response => response.json())
        .then(aJson => {
          //console.log(aJson)
          var blob = new Blob([ aJson ], { "type" : "text/plain" });
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          if(this.Premenu){
            link.download = 'Configs.txt'
          } else{
            link.download = this.Dselected+'_config.txt'
          }
          link.click()
          this.Premenu=false;
          //this.dataReport=JSON.stringify(aJson);
        })

      }, 500)

    }

    },
    dReport: function(){
      var a={number: this.Rselected}
      fetch('/downloadRep', {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
         },

        body: JSON.stringify(a),
      })
      .then(response => response.json())
      .then(aJson => {
        //console.log(aJson)
        var blob = new Blob([ aJson ], { "type" : "text/plain" });
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = this.Rselected+'_report.txt'
        link.click()
        //this.dataReport=JSON.stringify(aJson);
      })


    },

  },
   watch: {
     dataG: function(val){
       let palette=["#FFADAD","#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"]
       let oppo=Math.floor(palette.length/val.datasets.length)
       let colorpal=[]
       for (let i=0; i<val.datasets.length; i+=oppo){
         colorpal[i]=palette[i]
       }


       let chart = new frappe.Chart("#chart", {  // or a DOM element,
            // new Chart() in case of ES6 module with above usage
           title: "Delivery %",
           data: val,
           type: 'line', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
           height: 700,
           truncateLegends: true,
           colors: colorpal,
           axisOptions: {
             xAxisMode: "span",
             yAxisMode: "span",
             xIsSeries: true
           },
           tooltipOptions: {
             formatTooltipX: (d) => (parseFloat(d).toFixed(2) + "").toUpperCase() + " seconds",
             formatTooltipY: (d) => parseFloat(d).toFixed(2) + " delivered/created"
           },
           lineOptions: {
             spline: false,
             hideDots: 1,
             heatline: 0
           }
         })


     }

   },


  template: `
  <h1 v-if="!pressed"> Select simulation values</h1>
   <div id="chart"></div>



  <reports v-if="Charging()" v-bind:Rep="dataReport"> </reports>

  <form v-if="!pressed" v-on:submit.prevent="Confirm">
  <table class="rtable" border="1">
  <tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <th>Default</th>
  </tr>
  <tr v-for="(sale, i) in Config" >
     <th scope="row"  v-if="sale[5]<=nGroups">{{sale[0]}}</th>
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label class="vals"><input class="cbox" :disbaled="dis" @change="chData(i, sale[1])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[1]}}">({{sale[1]}})</label></td>
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label class="vals"><input class="cbox" :disabled="dis" @change="chData(i, sale[2])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[2]}}">({{sale[2]}})</label></td>
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label class="vals"><input class="cbox" :disabled="dis" @change="chData(i, sale[3])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[3]}}">({{sale[3]}})</label></td>
     <td v-if="sale[5]<=nGroups">{{sale[4]}}</td>
  </tr>
  </table>
  <p><input class="subm" type="submit" value="Start" name="b1"></p>
  </form>

  <br>
  <form v-if="dataReport!='Charging'" ref="form" v-on:submit.prevent="dConfig()">
  <select class="form-control" name="template" v-model="Dselected">
     <option v-for="(item,index) in parseInt(Nsim.total)" v-bind:value="index+1">
        {{ index+1}}
     </option>
 </select>
  <input class="dr" type="submit" value="Download configuration">
  </form>

  <form v-if="dataReport!='Charging'" ref="form" v-on:submit.prevent="dReport()">
  <select class="form-control" name="template" v-model="Rselected">
     <option v-for="(item,index) in parseInt(Nsim.total)" v-bind:value="index+1">
        {{ index+1}}
     </option>
 </select>
  <input class="dr" type="submit" value="Download report">
  </form>

  <div id="popup" v-if="Premenu==true">
  <button id="D" v-on:click="dConfig(1)"> Download config files</button>
  <button id="S" v-on:click="StartB()"> Start simulations</button>
  <button id="C" v-on:click="Premenu=false"> Cancel</button>
  </div>
   `

};

const reports  = {
  props: ['Rep'],


  template: `
  <div class="loader">
    <div class="inner one"></div>
    <div class="inner two"></div>
    <div class="inner three"></div>
  </div>
   `

};


//const chart=frappe.
const app = Vue.createApp(rootComponent);
app.component('reports', reports);


const vm = app.mount("#app");
