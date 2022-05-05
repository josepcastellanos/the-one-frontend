//Creating the Vue object.
const rootComponent = {
  data() {
   return{
     Premenu: false,
     pressed: false,
     dataReport: "Charging",
     Nsim: 1,
     Dselected: 1,
     Rselected: 1,
     OneConfig: [{
       sTime: 43200,
       tRange: 10,
       tSpeed: 250,

       Grout: "EpidemicRouter",
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
     }],


   }
 },
 methods: {
   Confirm: function(){
     this.Premenu=true;
   },
   Cancel: function(){

   },
   Start: function(){
      this.pressed=true;
      this.Premenu=false;

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

    },
    dConfig: function(all){
      //SELECT DEL REPORT Y CONFIG, Y PEDIR AL BACK ESE CONFIG/REPORT CONTENT, METER EN UNA VARIABLE, Y DESCARGAR ASÍ.
      if (all==1){
        this.Premenu=false;
        const b=JSON.parse(JSON.stringify(this.OneConfig))
        fetch('/GenConfig', {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
           },
          body: JSON.stringify(b),
        })
        .then(response => console.log("b"))

        var a={number: "all", total: this.Nsim}
      } else {
        var a={number: this.Dselected}
      }
      setTimeout(()=> {
        fetch('/downloadConfig', {
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
          if(this.Premenu){
            link.download = 'Configs.txt'
          } else{
            link.download = this.Dselected+'_config.txt'
          }

          link.click()
          //this.dataReport=JSON.stringify(aJson);
        })

      }, 500)


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
    graph: function(){
      const data = {
          labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
              "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
          ],
          datasets: [
              {
                  name: "Some Data", type: "bar",
                  values: [25, 40, 40, 35, 8, 52, 17, -4]
              },
              {
                  name: "Another Set", type: "line",
                  values: [25, 50, -10, 15, 18, 32, 27, 14]
              }
          ]
      }

      const chart = new frappe.Chart("#chart", {  // or a DOM element,
                                                  // new Chart() in case of ES6 module with above usage
          title: "My Awesome Chart",
          data: data,
          type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
          height: 250,
          colors: ['#7cd6fd', '#743ee2']
      })


    const data2 = {
        labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
            "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
        ],
        datasets: [
            {
                name: "Some Data", type: "bar",
                values: [25, 40, 0, 35, 8, 52, 17, -4]
            },
            {
                name: "Another Set", type: "line",
                values: [25, 50, -10, 15, 18, 32, 27, 14]
            }
        ]
    }

    const chart2 = new frappe.Chart("#chart2", {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "My NotAwesome Chart",
        data: data2,
        type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    })

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

           Grout: "EpidemicRouter",
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
 <button v-on:Click="graph"> jiji </button>
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

 <h1 v-if="!pressed" > Select the simulation configuration: </h1>

 <form v-if="!pressed" ref="form" v-on:submit.prevent="Confirm">




 <div style="display: flex;">
 <config class="uwu" v-if="Nsim>=1" v-on:eConfig="nSimU($event, 0)" pC="false"> </config>
 <config v-if="Nsim>=2" v-on:eConfig="nSimU($event, 1)" pC="true">> </config>
 <config v-if="Nsim>=3" v-on:eConfig="nSimU($event, 2)" pC="true">> </config>
 <config v-if="Nsim>=4" v-on:eConfig="nSimU($event, 3)" pC="true">> </config>
 <config v-if="Nsim>=5" v-on:eConfig="nSimU($event, 4)" pC="true">> </config>
 <config v-if="Nsim>=6" v-on:eConfig="nSimU($event, 5)" pC="true">> </config>
 <config v-if="Nsim>=7" v-on:eConfig="nSimU($event, 6)" pC="true">> </config>
 <config v-if="Nsim>=8" v-on:eConfig="nSimU($event, 7)" pC="true">> </config>
</div>


 <input class="start" type="submit" value="Start!">
 </form>


 <reports v-if="pressed" v-bind:Rep="dataReport"> </reports>
 <br>
 <form v-if="dataReport!='Charging'" ref="form" v-on:submit.prevent="dConfig()">
 <select class="form-control" name="template" v-model="Dselected">
    <option v-for="(item,index) in OneConfig" v-bind:value="index+1">
       {{ index+1}}
    </option>
</select>
 <input type="submit" value="Descarregar configuració">
 </form>

 <form v-if="dataReport!='Charging'" ref="form" v-on:submit.prevent="dReport()">
 <select class="form-control" name="template" v-model="Rselected">
    <option v-for="(item,index) in OneConfig" v-bind:value="index+1">
       {{ index+1}}
    </option>
</select>
 <input type="submit" value="Descarregar report">
 </form>

 <div id="popup" v-if="Premenu==true">
 <button id="D" v-on:click="dConfig(1)"> Download config files</button>
 <button id="S" v-on:click="Start()"> Start simulations</button>
 <button id="C" v-on:click="Premenu=false"> Cancel</button>
 </div>



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

        Grout: "EpidemicRouter",
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
      pStyle: {},
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
  props: ['pC'],
  created(){
    if(this.pC=="true"){
      this.pStyle={
        display: 'none',
        margin: '40px',
      }
    }
  },

  methods: {
    traced: function(n){
      return this.Config.nGroups>=n && this.Config.traces == "None" && this.taxi==false
    },
  },
  directives: {
    visible: {
      inserted: function(el, binding){
          el.style.visibility = !binding.value ? 'visible' : 'hidden';
      }
    }
  },
  template: `
  <div id="main">
  <label v-bind:style="pStyle" for="sTime">Simulation time: </label>
   <select id="time" name="time values" form="form" v-model="Config.sTime">
    <option value="36000" > 36000 seconds </option>
    <option value="43200" selected> 43200 seconds </option>
    <option value="54000"> 54000 seconds </option>
   </select>
 <br>
 <label v-bind:style="pStyle" for="tRange">Transmit range: </label>
  <select id="transmit" name="transmit values" form="form" v-model="Config.tRange">
   <option value="10" selected> 10 meters </option>
   <option value="50"> 50 meters </option>
   <option value="100"> 100 meters </option>
  </select>
 <br>
 <label v-bind:style="pStyle" for="tSpeed">Transmit speed: </label>
  <select id="transmit" name="transmit values" form="form" v-model="Config.tSpeed">
   <option value="125"> 1 Mbps / 125 kBps </option>
   <option value="250" selected> 2 Mbps / 250 kBps </option>
   <option value="650"> 5 Mbps / 650 kBps </option>
  </select>
  <br>
  <label v-bind:style="pStyle" for="Grout">Group routing algorithm: </label>
   <select id="transmit" name="transmit values" form="form" v-model="Config.Grout">
    <option value="ProphetRouter"> Prophet </option>
    <option value="EpidemicRouter" selected> Epidemic </option>
    <option value="SprayAndWaitRouter"> Spray and wait router </option>
    <option value="ActiveRouter"> Active </option>
    <option value="DirectDeliveryRouter"> Direct delivery </option>
    <option value="EpidemicOracleRouter"> Epidemic Oracle </option>
    <option value="FirstContactRouter"> First contact </option>
    <option value="LifeRouter"> Life </option>
    <option value="MaxPropRouter"> Max prop </option>
    <option value="MaxPropRouterWithEstimation"> Max prop with estimation </option>
    <option value="MessageRouter"> Message </option>
    <option value="PassiveRouter"> Passive </option>
    <option value="ProphetRouterWithEstimation"> Prophet with estimation </option>
    <option value="ProphetV2Router"> Prophet V2 </option>
    <option value="WaveRouter"> Wave </option>
   </select>
   <br>
 <label v-bind:style="pStyle" v-if="!taxi" for="nGroups">Number of Groups: </label>
  <select v-if="!taxi" id="Groups" name="group number" form="form" v-model="Config.nGroups">
   <option value="1" selected> 1 Group </option>
   <option value="2" > 2 Groups </option>
   <option value="3" > 3 Groups </option>
  </select>
  <br v-if=!taxi>
 <label v-bind:style="pStyle" v-if="taxi" for="nGroups">Number of Groups: </label>
  <select v-if="taxi" id="Groups" name="group number" form="form" v-model="Config.nGroups">
   <option value="1" selected> 1 Group </option>
  </select>
  <br v-if=taxi>
 <label v-bind:style="pStyle" v-if="!taxi" for="nGroups"> Number of Hosts Group 1: </label>
  <select v-if="!taxi" id="groups" name="host number" form="form" v-model="Config.G1_nH">
   <option value="60" selected> 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
   <option value="100" > 100 Hosts </option>
  </select>
  <br v-if=!taxi>
 <label v-bind:style="pStyle" v-if="taxi" for="nGroups"> Number of Hosts Group 1: </label>
  <select v-if="taxi" id="groups" name="host number" form="form" v-model="Config.G1_nH">
   <option value="304" selected> 304 Hosts </option>
  </select>
  <br v-if=taxi>
 <label v-bind:style="pStyle" for="nGroups"> Range Group 1: </label>
  <select :style="{visibility: traced(1) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G1_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Route type Group 1: </label>
  <select :style="{visibility: traced(1) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G1_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Number of Hosts Group 2: </label>
  <select :style="{visibility: Config.nGroups>=2 ? 'visible' : 'hidden'}" id="groups" name="host number" form="form" v-model="Config.G2_nH">
   <option value="60" selected> 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
   <option value="100" > 100 Hosts </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Range Group 2: </label>
  <select :style="{visibility: traced(2) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G2_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Route type Group 2: </label>
  <select :style="{visibility: traced(2) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G2_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Number of Hosts Group 3: </label>
  <select :style="{visibility: Config.nGroups>=3 ? 'visible' : 'hidden'}" id="groups" name="host number" form="form" v-model="Config.G3_nH">
   <option value="40" selected> 40 Hosts </option>
   <option value="60" > 60 Hosts </option>
   <option value="80" > 80 Hosts </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Range Group 3: </label>
  <select :style="{visibility: traced(3) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G3_rF">
   <option value="data/tram3.wkt" selected> Tram 3 </option>
   <option value="data/tram4.wkt" > Tram 4 </option>
   <option value="data/tram10.wkt" > Tram 10 </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="nGroups"> Route type Group 3: </label>
  <select :style="{visibility: traced(3) ? 'visible' : 'hidden'}" id="group" name="group range" form="form" v-model="Config.G3_rT">
   <option value="1" selected> Circular </option>
   <option value="2" > Ping-pong </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="gBuffer">Group buffer size: </label>
  <select id="group" name="group values" form="form" v-model="Config.gBuffer">
   <option value="2M"> 2 M </option>
   <option value="5M" selected> 5 M </option>
   <option value="10M"> 10 M </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="wTime">Group wait time: </label>
  <select id="group" name="group values" form="form" v-model="Config.wTime">
   <option value="0, 120" selected> 0 seconds to 120 seconds </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="gTTL">Group message TTL: </label>
  <select id="group" name="group values" form="form" v-model="Config.gTTL">
   <option value="120"> 2 hours </option>
   <option value="300" selected> 5 hours </option>
   <option value="420"> 7 hours </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="gSpeed">Group walking speed: </label>
  <select id="group" name="group values" form="form" v-model="Config.gSpeed">
   <option value="0.2, 1.0"> 0.2 to 1.0 m/sec </option>
   <option value="0.5, 1.5" selected> 0.5 to 1.5 m/sec </option>
   <option value="1.5, 2.5"> 1.5 to 2.5 m/sec </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="wSize">World size: </label>
  <select id="world" name="world values" form="form" v-model="Config.wSize">
   <option value="4500, 3400" selected> 4500 x 3400 meters </option>
   <option value="5625, 4250" selected> 5625 x 4250 meters </option>
   <option value="9000, 6800"> 9000 x 6800 meters </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="mInterval">Message creation interval: </label>
  <select id="interval" name="creation values" form="form" v-model="Config.mInterval">
   <option value="5, 15"> One new message every 5 to 15 seconds </option>
   <option value="25, 35" selected> One new message every 25 to 35 seconds </option>
   <option value="45, 55"> One new message every 45 to 55 seconds </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="mSize">Message sizes: </label>
  <select id="message size" name="creation values" form="form" v-model="Config.mSize">
   <option value="125k, 500k"> 125kB - 500kB </option>
   <option value="500k, 1M" selected> 500kB - 1MB </option>
   <option value="1M, 2M"> 1MB - 2MB </option>
  </select>
  <br>
 <label v-bind:style="pStyle" for="traces">Trace file: </label>
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





console.log(frappe)
//const chart=frappe.
const app = Vue.createApp(rootComponent);

app.component('reports', reports);
app.component('config', config);


const vm = app.mount("#app");
