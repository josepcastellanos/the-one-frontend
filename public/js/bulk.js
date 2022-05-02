const rootComponent  = {
  methods: {
    Param: function(){
      console.log('a')

    },

  },


  template: `
  <h1> BULK</h1>
  <button v-on:click="Param">a</button>
   `

};
//const chart=frappe.
const app = Vue.createApp(rootComponent);


const vm = app.mount("#app");
