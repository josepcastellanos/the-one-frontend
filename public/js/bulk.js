const rootComponent  = {
  data(){
    return{
    nGroups: "1",
    Config: {
      sTime: ["Simulation Time", "0", "2", "3", "43200 seconds", "0"],
      tRange: ["Transmit range", "1", "2", "3", "10 meters", "0"],
      tSpeed: ["Transmit speed", "1", "2", "3", "2 Mbps / 250 kBps", "0"],
      nGroups: ["Number of Groups", "1", "2", "3", "1 Group", "0"],
      G1_nH: ["Number of Hosts Group 1", "1", "2", "3", "60 Hosts", "1"],
      G1_rF: ["Range Group 1", "1", "2", "3", "Tram 3", "1"],
      G1_rT: ["Movement model Group 1", "1", "2", "3", "Circular", "1"],
      G2_nH: ["Number of Hosts Group 2", "1", "2", "3", "60 Hosts", "2"],
      G2_rF: ["Range Group 2", "1", "2", "3", "2 Mbps / Tram 3", "2"],
      G2_rT: ["Movement model Group 2", "1", "2", "3", "Circular", "2"],
      G3_nH: ["Number of Hosts Group 3", "1", "2", "3", "60 Hosts", "3"],
      G3_rF: ["Range Group 3", "1", "2", "3", "Tram 3", "3"],
      G3_rT: ["Movement model Group 3", "1", "2", "3", "Circular", "3"],

      gBuffer: ["Group buffer size", "1", "2", "3", "5 M", "0"],
      wTime: ["Group wait time", "1", "2", "3", "0 seconds to 120 seconds", "0"],
      gTTL: ["Group message TTL", "1", "2", "3", "5 hours", "0"],
      gSpeed: ["Group walking speed", "1", "2", "3", "0.5 to 1.5 m/sec", "0"],
      wSize: ["World size", "1", "2", "3", "4500 x 3400 meters", "0"],
      mInterval: ["Message creation interval", "1", "2", "3", "One new message every 25 to 35 seconds", "0"],
      mSize: ["Message sizes", "1", "2", "3", "500kB - 1MBs", "0"],


  },
  Group: {
    a: ["1","2","3"],
    b: ["1","2","3"],
    c: ["1","2","3"]
  }


    }
  },
  methods: {
    GroupCheck: function(ngr) {
      if(this.nGroups>ngr){
        return "false";
      } else {
        return "true";

      }
    }

  },


  template: `
  <h1> BULK</h1>





  <form method="post" action="http://jkorpela.fi/cgi-bin/echo.cgi">
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
     <td v-if="sale[5]<=nGroups"><input v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[1]}}">{{sale[1]}}</td>
     <td v-if="sale[5]<=nGroups"><input v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[2]}}">{{sale[2]}}</td>
     <td v-if="sale[5]<=nGroups"><input v-if="sale[5]<=nGroups" type="checkbox" value="{{sale[3]}}">{{sale[3]}}</td>
     <td v-if="sale[5]<=nGroups">{{sale[4]}}</td>
  </tr>
  </table>
  <p><input type="submit" value="submit" name="b1"></p>
  </form>
   `

};

//const chart=frappe.
const app = Vue.createApp(rootComponent);


const vm = app.mount("#app");
