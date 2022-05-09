const rootComponent  = {
  data(){
    return{
    nGroups: "1",
    dataReport: "Charging",
    maxOpt: "18",
    dis: false,
    pressed: false,
    Config: {
      "Scenario.endTime": ["Simulation Time", "36000", "43200", "54000", "43200 seconds", "0"],
      "btInterface.transmitRange": ["Transmit range", "10", "50", "100", "10 meters", "0"],
      "btInterface.transmitSpeed": ["Transmit speed", "125", "250", "650", "2 Mbps / 250 kBps", "0"],
      "Group.router": ["Group routing algorithm", "ProphetRouter", "EpidemicRouter", "SprayAndWaitRouter", "Epidemic", "0"],
      "Scenario.nrofHostGroups": ["Number of Groups", "1", "2", "3", "1 Group", "0"],
      "Group1.nrofHosts": ["Number of Hosts Group 1", "60", "80", "100", "60 Hosts", "1"],
      "Group1.routeFile": ["Range Group 1", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "1"],
      "Group2.nrofHosts": ["Number of Hosts Group 2", "60", "80", "100", "60 Hosts", "2"],
      "Group2.routeFile": ["Range Group 2", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "2"],
      "Group3.nrofHosts": ["Number of Hosts Group 3", "60", "80", "100", "60 Hosts", "3"],
      "Group3.routeFile": ["Range Group 3", "data/tram3.wkt", "data/tram4.wkt", "data/tram10.wkt", "Tram 3", "3"],
      "Group.bufferSize": ["Group buffer size", "2", "5", "10", "5 M", "0"],
      "Group.waitTime": ["Group wait time", "0, 120", "0, 120", "0, 120", "0 seconds to 120 seconds", "0"],
      "Group.msgTtl": ["Group message TTL", "120", "300", "420", "300 minutes", "0"],
      "Group.speed": ["Group walking speed", "0.2, 1.0", "0.5, 1.5", "1.5, 2.5", "0.5 to 1.5 m/sec", "0"],
      "MovementModel.worldSize": ["World size", "4500, 3400", "5625, 4250", "9000, 6800", "4500 x 3400 meters", "0"],
      "Events1.interval": ["Message creation interval", "5, 15", "25, 35", "45, 55", "One new message every 25 to 35 seconds", "0"],
      "Events1.size": ["Message sizes", "125k, 500k", "500k, 1M", "1M, 2M", "500kB - 1MBs", "0"],


  },
  GroupShow: [false, false, false],

  Csim: []


}
  },
  methods: {
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

        this.dataReport=JSON.stringify(aJson);
      })
    }

  },


  template: `
  <h1> BULK</h1>




  <reports v-if="pressed" v-bind:Rep="dataReport"> </reports>

  <form v-if="!pressed" v-on:submit.prevent="StartB">
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
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label><input class="cbox" :disbaled="dis" @change="chData(i, sale[1])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[1]}}">({{sale[1]}})</label></td>
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label><input class="cbox" :disabled="dis" @change="chData(i, sale[2])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[2]}}">({{sale[2]}})</label></td>
     <td class="checkboxes" v-if="sale[5]<=nGroups"><label><input class="cbox" :disabled="dis" @change="chData(i, sale[3])" v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[3]}}">({{sale[3]}})</label></td>
     <td v-if="sale[5]<=nGroups">{{sale[4]}}</td>
  </tr>
  </table>
  <p><input type="submit" value="StartB!" name="b1"></p>
  </form>
   `

};

const reports  = {
  props: ['Rep'],


  template: `
  <small> {{Rep}} </small>
   `

};


//const chart=frappe.
const app = Vue.createApp(rootComponent);
app.component('reports', reports);


const vm = app.mount("#app");
