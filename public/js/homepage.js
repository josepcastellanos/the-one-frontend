const rootComponent  = {
  methods: {
    Param: function(){
      console.log('a')

    },

  },


  template: `
  <form class="login" action="/par" method="post">
      <input type="submit" name="" value="Parametrizado">
    </form>
  <form class="login" action="/bulk" method="post">
      <input type="submit" name="" value="Bulk">
    </form>
   `

};
//const chart=frappe.
const app = Vue.createApp(rootComponent);


const vm = app.mount("#app");
