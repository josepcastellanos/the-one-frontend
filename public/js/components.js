
//Creating the Vue object.
const rootComponent = {
  data() {
   return{
     pressed: false,
     dataReport: "Charging",
     OneConfig: {
       sTime: 43200,
       tRange: 10,
       tSpeed: 250,
       gHosts: 40,
       gBuffer: 5,
       wTime: "0, 120",
       gTTL: 300,
       gSpeed: "0.5, 1.5",
       wSize: "4500, 3400",
       mInterval: "25, 35",
       mSize: "500k, 1M"

     }

   }
 },
 methods: {
   Start: function(){
      this.pressed=true


      const a=JSON.parse(JSON.stringify(this.OneConfig))
      console.log(a)
      fetch('/Start', {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
         },
        body: JSON.stringify(a),
      })
      .then(response => response.json())
      .then(aJson => {
        console.log(aJson)
        this.dataReport=aJson
      })

    }, // end sendact
    RepCharged: function (){

    }

 },


 template: `<button v-if="!pressed" v-on:click="Start">Click
 me</button>

 <h1 v-if="!pressed" > Select the simulation configuration: </h1>

 <form v-if="!pressed" ref="form" v-on:submit.prevent="Start">
   <label for="sTime">Simulation time: </label>
    <select id="time" name="time values" form="form" v-model="OneConfig.sTime">
     <option value="36000" > 36000 seconds </option>
     <option value="43200" selected> 43200 seconds </option>
     <option value="54000"> 54000 seconds </option>
    </select>
  <br>
  <label for="tRange">Transmit range: </label>
   <select id="transmit" name="transmit values" form="form" v-model="OneConfig.tRange">
    <option value="10" selected> 10 meters </option>
    <option value="50"> 50 meters </option>
    <option value="100"> 100 meters </option>
   </select>
  <br>
  <label for="tSpeed">Transmit speed: </label>
   <select id="transmit" name="transmit values" form="form" v-model="OneConfig.tSpeed">
    <option value="125"> 1 Mbps / 125 kBps </option>
    <option value="250" selected> 2 Mbps / 250 kBps </option>
    <option value="650"> 5 Mbps / 650 kBps </option>
   </select>
  <br>
  <label for="gHosts">Group number of Hosts: </label>
   <select id="transmit" name="transmit values" form="form" v-model="OneConfig.gHosts">
    <option value="20"> 20 Hosts </option>
    <option value="40" selected> 40 Hosts </option>
    <option value="80"> 80 Hosts </option>
   </select>
  <br>
  <label for="gBuffer">Group buffer size: </label>
   <select id="group" name="group values" form="form" v-model="OneConfig.gBuffer">
    <option value="2"> 2 M </option>
    <option value="5" selected> 5 M </option>
    <option value="10"> 10 M </option>
   </select>
  <br>
  <label for="wTime">Group wait time: </label>
   <select id="group" name="group values" form="form" v-model="OneConfig.wTime">
    <option value="0, 120" selected> 0 seconds to 120 seconds </option>
   </select>
  <br>
  <label for="gTTL">Group message TTL: </label>
   <select id="group" name="group values" form="form" v-model="OneConfig.gTTL">
    <option value="120"> 2 hours </option>
    <option value="300" selected> 5 hours </option>
    <option value="420"> 7 hours </option>
   </select>
  <br>
  <label for="gSpeed">Group walking speed: </label>
   <select id="group" name="group values" form="form" v-model="OneConfig.gSpeed">
    <option value="0.2, 1.0"> 0.2 to 1.0 m/sec </option>
    <option value="0.5, 1.5" selected> 0.5 to 1.5 m/sec </option>
    <option value="1.5, 2.5"> 1.5 to 2.5 m/sec </option>
   </select>
  <br>
  <label for="wSize">World size: </label>
   <select id="world" name="world values" form="form" v-model="OneConfig.wSize">
    <option value="2250, 1700"> 2250 x 1700 meters </option>
    <option value="4500, 3400" selected> 4500 x 3400 meters </option>
    <option value="9000, 6800"> 9000 x 6800 meters </option>
   </select>
  <br>
  <label for="mInterval">Message creation interval: </label>
   <select id="interval" name="creation values" form="form" v-model="OneConfig.mInterval">
    <option value="5, 15"> One new message every 5 to 15 seconds </option>
    <option value="25, 35" selected> One new message every 25 to 35 seconds </option>
    <option value="45, 55"> One new message every 45 to 55 seconds </option>
   </select>
  <br>
  <label for="mSize">Message sizes: </label>
   <select id="message size" name="creation values" form="form" v-model="OneConfig.mSize">
    <option value="125k, 500k"> 125kB - 500kB </option>
    <option value="500k, 1M" selected> 500kB - 1MB </option>
    <option value="1M, 2M"> 1MB - 2MB </option>
   </select>
  <br>

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



const app = Vue.createApp(rootComponent);
app.component('reports', reports);
const vm = app.mount("#app");
