
//Creating the Vue object.
const rootComponent = {
  data() {
   return{
     pressed: true,

   }
 },
 methods: {
   Start: function(){
      fetch('/Start')
      this.pressed=false
    }, // end sendact

 },


 template: `<button v-if="pressed" v-on:click="Start">Click
 me</button>
 <h1 v-if="!pressed">CHARGING THE ONE </h1>
 `


} //end options



const app = Vue.createApp(rootComponent);

const vm = app.mount("#app");
