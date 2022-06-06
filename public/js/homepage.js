const rootComponent  = {
  methods: {
    Param: function(){
      console.log('a')

    },

  },


  template: `
  <h1>Select a simulation mode</h1>
  <div class="nav">
    <form class="centerButtons" action="/par" method="post">
        <input class="nav_button" type="submit" name="" value="Parameterized">
      </form>
    <form class="centerButtons" action="/bulk" method="post">
        <input class="nav_button" type="submit" name="" value="Bulk">
      </form>
    </div>
   `

};
//const chart=frappe.
const app = Vue.createApp(rootComponent);


const vm = app.mount("#app");
