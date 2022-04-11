
//Creating the Vue object.
const rootComponent = {
  data() {
   return{
     pressed: false,
     dataReport: "Charging",
     Nsim: 1,
     OneConfig: [{
       sTime: 43200,
       tRange: 10,
       tSpeed: 250,

       nGroups: "1",
       G1_ID: "c",
       G1_nH: "60",
       G1_rF: "data/tram3.wkt",
       G1_rT: "1",
       G2_ID: "p",
       G2_nH: "60",
       G2_rF: "data/tram4.wkt",
       G2_rT: "2",
       G3_ID: "w",
       G3_nH: "60",
       G3_rF: "data/tram10.wkt",
       G3_rT: "1",

       PreL: "13000",

       gHosts: 60,
       gBuffer: "5M",
       wTime: "0, 120",
       gTTL: 300,
       gSpeed: "0.5, 1.5",
       wSize: "4500, 3400",
       mInterval: "25, 35",
       mSize: "500k, 1M",
       traces: "None"
     }]

   }
 },
 methods: {
   Start: function(){
      this.pressed=true


      const a=JSON.parse(JSON.stringify(this.OneConfig))
      fetch('/Start', {
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

    }, // end sendact
    nSimU: function(conf, v) {
      let a=this.OneConfig
      a[v]=conf
      this.OneConfig=[]
      this.OneConfig=a
      //vm.OneConfig.splice(v, 1, conf)
      //this.OneConfig.splice(v, 1, conf)
      //Vue.set(this.OneConfig, v, conf)

      this.$forceUpdate();
      if (conf.traces!="None"){
        console.log("uwu")

        //AWUI CONFIG TRACES!!!
      }

    }

 },
 watch: {
   Nsim: function(val, oldval){
     if (oldval<val){
       dif=val-oldval
     } else {
       dif=oldval-val
     }

     if (oldval<val){
       for (var i=0; i<dif; i++){
         this.OneConfig.push({
           sTime: 43200,
           tRange: 10,
           tSpeed: 250,

           nGroups: "1",
           G1_ID: "c",
           G1_nH: "60",
           G1_rF: "data/tram3.wkt",
           G1_rT: "1",
           G2_ID: "p",
           G2_nH: "60",
           G2_rF: "data/tram4.wkt",
           G2_rT: "2",
           G3_ID: "w",
           G3_nH: "60",
           G3_rF: "data/tram10.wkt",
           G3_rT: "1",

           PreL: "13000",

           gHosts: 60,
           gBuffer: "5M",
           wTime: "0, 120",
           gTTL: 300,
           gSpeed: "0.5, 1.5",
           wSize: "4500, 3400",
           mInterval: "25, 35",
           mSize: "500k, 1M",
           traces: "None"
         })
       }

     } else {
       for (var i=0; i<dif; i++){
         this.OneConfig.pop();
       }


     }
     this.$forceUpdate();
   },


 },


 template: `
  <label v-if="!pressed" for="nSim">Number simulations: </label>
  <select v-if="!pressed" id="nSim" name="simulation values" form="form" v-model="Nsim">
    <option value="1" selected> 1 simulation </option>
    <option value="2"> 2 simulation </option>
    <option value="3"> 3 simulation </option>
    <option value="4"> 4 simulation </option>
    <option value="5"> 5 simulation </option>
    <option value="6"> 6 simulation </option>
    <option value="7"> 7 simulation </option>
    <option value="8"> 8 simulation </option>
  </select>
  <br>
  <br>



 <h1 v-if="!pressed" > Select the simulation configuration: </h1>

 <form v-if="!pressed" ref="form" v-on:submit.prevent="Start">
 <config v-if="Nsim>=1" v-on:eConfig="nSimU($event, 0)"> </config>
 <config v-if="Nsim>=2" v-on:eConfig="nSimU($event, 1)"> </config>
 <config v-if="Nsim>=3" v-on:eConfig="nSimU($event, 2)"> </config>
 <config v-if="Nsim>=4" v-on:eConfig="nSimU($event, 3)"> </config>
 <config v-if="Nsim>=5" v-on:eConfig="nSimU($event, 4)"> </config>
 <config v-if="Nsim>=6" v-on:eConfig="nSimU($event, 5)"> </config>
 <config v-if="Nsim>=7" v-on:eConfig="nSimU($event, 6)"> </config>
 <config v-if="Nsim>=8" v-on:eConfig="nSimU($event, 7)"> </config>



 <input type="submit" value="Start!">
 </form>
 <reports v-if="pressed" v-bind:Rep="dataReport"> </reports>
 `


} //end options


const reports  = {
  props: ['Rep'],


  template: `
  <small> {{Rep}} </small>
   `

};

const config  = {
  data() {
    return {
      Config: {
        sTime: 43200,
        tRange: 10,
        tSpeed: 250,

        nGroups: "1",
        G1_ID: "c",
        G1_nH: "60",
        G1_rF: "data/tram3.wkt",
        G1_rT: "1",
        G2_ID: "p",
        G2_nH: "60",
        G2_rF: "data/tram4.wkt",
        G2_rT: "2",
        G3_ID: "w",
        G3_nH: "60",
        G3_rF: "data/tram10.wkt",
        G3_rT: "1",

        PreL: "13000",

        gHosts: 60,
        gBuffer: "5M",
        wTime: "0, 120",
        gTTL: 300,
        gSpeed: "0.5, 1.5",
        wSize: "4500, 3400",
        mInterval: "25, 35",
        mSize: "500k, 1M",
        traces: "None"
      },
      taxi: false,
    }
  },
  watch: {
    Config: {
      handler (o,n) {
        if(this.Config.traces=="taxi_february_1week_304nodes.txt"){
          this.taxi=true;
          this.Config.nGroups="1"
          this.Config.G1_nH="304"
        } else{
          this.taxi=false;
        }
        if(this.Config.traces=="RealityConnectionTraceFinal.txt"){
          this.Config.G1_nH="100"
        }
        //this.Config.gHosts=0
        switch (this.Config.nGroups) {
          case "1":
            this.Config.gHosts=this.Config.G1_nH*1;
            break;
          case "2": // foo es 0, por lo tanto se cumple la condición y se ejecutara el siguiente bloque
            this.Config.gHosts=this.Config.G1_nH*1+this.Config.G2_nH*1;
            break;
          case "3": // No hay sentencia "break" en el 'case 0:', por lo tanto este caso también será ejecutado
            this.Config.gHosts=this.Config.G1_nH*1+this.Config.G2_nH*1+this.Config.G3_nH*1;
            break; // Al encontrar un "break", no será ejecutado el 'case 2:'
          default:
            this.Config.gHosts=this.Config.G1_nH*1+this.Config.G2_nH*1+this.Config.G3_nH*1;
        }
      this.$emit('eConfig', this.Config)
      },
      deep: true,

    }
  },
  emits: ['eConfig'],
  methods: {
    traced: function(n){
      return this.Config.nGroups>=n && this.Config.traces == "None" && this.taxi==false
    },
  },
  template: `
  <div style="display: flex;">
  <label for="sTime">Simulation time: </label>
   <select id="time" name="time values" form="form" v-model="Config.sTime">
    <option value="36000" > 36000 seconds </option>
    <option value="43200" selected> 43200 seconds </option>
    <option value="54000"> 54000 seconds </option>
   </select>
 <br>
 <label for="tRange">Transmit range: </label>
  <select id="transmit" name="transmit values" form="form" v-model="Config.tRange">
   <option value="10" selected> 10 meters </option>
   <option value="50"> 50 meters </option>
   <option value="100"> 100 meters </option>
  </select>
 <br>
 <label for="tSpeed">Transmit speed: </label>
  <select id="transmit" name="transmit values" form="form" v-model="Config.tSpeed">
   <option value="125"> 1 Mbps / 125 kBps </option>
   <option value="250" selected> 2 Mbps / 250 kBps </option>
   <option value="650"> 5 Mbps / 650 kBps </option>
  </select>
 <br>


 <label v-if="!taxi" for="nGroups">Number of Groups </label>
  <select v-if="!taxi" id="Groups" name="group number" form="form" v-model="Config.nGroups">
   <option value="1" selected> 1 Group </option>
   <option value="2" > 2 Groups </option>
   <option value="3" > 3 Groups </option>
  </select>
 <br>
 <label v-if="taxi" for="nGroups">Number of Groups </label>
  <select v-if="taxi" id="Groups" name="group number" form="form" v-model="Config.nGroups">
   <option value="1" selected> 1 Group </option>
  </select>
 <br>
 <label v-if="!taxi" for="nGroups"> Number of Hosts Group 1 </label>
  <select v-if="!taxi" id="groups" name="host number" form="form" v-model="Config.G1_nH">
   <option value="60" selected> 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
   <option value="100" > 100 Hosts </option>
  </select>
 <br>
 <label v-if="taxi" for="nGroups"> Number of Hosts Group 1 </label>
  <select v-if="taxi" id="groups" name="host number" form="form" v-model="Config.G1_nH">
   <option value="304" selected> 304 Hosts </option>
  </select>
 <br>
 <label v-if="traced(1)" for="nGroups"> Range Group 1 </label>
  <select v-if="traced(1)" id="group" name="group range" form="form" v-model="Config.G1_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
 <br>
 <label v-if="traced(1)" for="nGroups"> Movement model Group 1</label>
  <select v-if="traced(1)" id="group" name="group range" form="form" v-model="Config.G1_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
 <br>

 <label v-if="Config.nGroups>=2" for="nGroups"> Number of Hosts Group 2 </label>
  <select v-if="Config.nGroups>=2" id="groups" name="host number" form="form" v-model="Config.G2_nH">
   <option value="60" selected> 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
   <option value="100" > 100 Hosts </option>
  </select>
 <br>
 <label v-if="traced(2)" for="nGroups"> Range Group 2 </label>
  <select v-if="traced(2)" id="group" name="group range" form="form" v-model="Config.G2_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
 <br>
 <label v-if="traced(2)" for="nGroups"> Movement model Group 2</label>
  <select v-if="traced(2)" id="group" name="group range" form="form" v-model="Config.G2_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
 <br>

 <label v-if="Config.nGroups>=3" for="nGroups"> Number of Hosts Group 3 </label>
  <select v-if="Config.nGroups>=3" id="groups" name="host number" form="form" v-model="Config.G3_nH">
   <option value="40" selected> 40 Hosts </option>
   <option value="60" > 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
  </select>
 <br>
 <label v-if="traced(3)" for="nGroups"> Range Group 3 </label>
  <select v-if="traced(3)" id="group" name="group range" form="form" v-model="Config.G3_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
 <br>
 <label v-if="traced(3)" for="nGroups"> Movement model Group 3</label>
  <select v-if="traced(3)" id="group" name="group range" form="form" v-model="Config.G3_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
 <br>

 <label for="gBuffer">Group buffer size: </label>
  <select id="group" name="group values" form="form" v-model="Config.gBuffer">
   <option value="2M"> 2 M </option>
   <option value="5M" selected> 5 M </option>
   <option value="10M"> 10 M </option>
  </select>
 <br>
 <label for="wTime">Group wait time: </label>
  <select id="group" name="group values" form="form" v-model="Config.wTime">
   <option value="0, 120" selected> 0 seconds to 120 seconds </option>
  </select>
 <br>
 <label for="gTTL">Group message TTL: </label>
  <select id="group" name="group values" form="form" v-model="Config.gTTL">
   <option value="120"> 2 hours </option>
   <option value="300" selected> 5 hours </option>
   <option value="420"> 7 hours </option>
  </select>
 <br>
 <label for="gSpeed">Group walking speed: </label>
  <select id="group" name="group values" form="form" v-model="Config.gSpeed">
   <option value="0.2, 1.0"> 0.2 to 1.0 m/sec </option>
   <option value="0.5, 1.5" selected> 0.5 to 1.5 m/sec </option>
   <option value="1.5, 2.5"> 1.5 to 2.5 m/sec </option>
  </select>
 <br>
 <label for="wSize">World size: </label>
  <select id="world" name="world values" form="form" v-model="Config.wSize">
   <option value="4500, 3400" selected> 4500 x 3400 meters </option>
   <option value="5625, 4250" selected> 5625 x 4250 meters </option>
   <option value="9000, 6800"> 9000 x 6800 meters </option>
  </select>
 <br>
 <label for="mInterval">Message creation interval: </label>
  <select id="interval" name="creation values" form="form" v-model="Config.mInterval">
   <option value="5, 15"> One new message every 5 to 15 seconds </option>
   <option value="25, 35" selected> One new message every 25 to 35 seconds </option>
   <option value="45, 55"> One new message every 45 to 55 seconds </option>
  </select>
 <br>
 <label for="mSize">Message sizes: </label>
  <select id="message size" name="creation values" form="form" v-model="Config.mSize">
   <option value="125k, 500k"> 125kB - 500kB </option>
   <option value="500k, 1M" selected> 500kB - 1MB </option>
   <option value="1M, 2M"> 1MB - 2MB </option>
  </select>
 <br>
 <label for="traces">Trace file: </label>
  <select id="trace file" name="creation values" form="form" v-model="Config.traces">
   <option value="asturies-er-1year-10m.one"> Asturies </option>
   <option value="Haggle3-Infocom5.csv" > H3-I5 </option>
   <option value="Haggle3-Infocom5-2.csv"> H3-I5-2 </option>
   <option value="haggle-one-cambridge-city-complete.tsv"> H1-Cambridge </option>
   <option value="RealityConnectionTraceFinal.txt"> Reality </option>
   <option value="taxi_february_1week_304nodes.txt"> Taxi </option>
   <option value="tor.csv"> Tor </option>
   <option value="None" selected> None </option>
  </select>
 <br>
 </div>
  `

};



const app = Vue.createApp(rootComponent);
app.component('reports', reports);
app.component('config', config);
const vm = app.mount("#app");
