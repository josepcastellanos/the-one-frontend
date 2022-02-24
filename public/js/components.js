
//Creating the Vue object.
const rootComponent = {
  data() {
   return{
     pressed: false,
     dataReport: "Charging",

   }
 },
 methods: {
   Start: function(){
      this.pressed=true
      console.log('pressed')

      fetch('/Start')
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
