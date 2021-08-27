<template><div>
  <div class="small">
    <p>Balance ETH : {{ETH}} {{ETHEUR?(Math.floor(ETHEUR.ETHEUR*ETH*100)/100)+"€":0}}</p>
    <p>Balance BTC : {{BTC}} {{BTCEUR?(Math.floor(BTCEUR.BTCEUR*BTC*100)/100)+"€":0}}</p>
    <p>Cours actuelle : {{price[price.length-1]}}</p>
    <line-chart v-if="datacollection" :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
  <div v-for="(value, name) in ordres">
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-card-title>Ordre {{value.symbol}} {{value.price}} {{value.side}}</v-card-title>
      <v-card-text class="text--primary">
        <div><p>créer le {{date(value.time)}}</p></div>

      </v-card-text>
      <v-card-actions>
        <v-btn text>Cancel order</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
import CardOrder from "../components/CardOrder";
const W3CWebSocket = require('websocket').w3cwebsocket;
import LineChart from './LineChart.js'
const Binance = require('binance-api-node').default

export default {
  components: {
    CardOrder,
    LineChart
  },
  data () {
    return {
      datacollection: null,
      test : "test",
      connection : null,
      price :[],
      l:[],
      ETH:0,
      BTC:0,
      ordres: Object,
      ordresDataset: [],
      ETHEUR:0,
      BTCEUR:0

    }
  },
  async created() {

    this.connection = new W3CWebSocket("wss://stream.binance.com:9443/ws/ethbtc@trade")
    this.connection.onmessage = (event)=>{
    let rep = JSON.parse(event.data)
    this.setData(rep.p)
}
    const client = Binance()
    this.BTCEUR = await client.prices({symbol:'BTCEUR'})
    this.ETHEUR=await client.prices({symbol:'ETHEUR'})
    let time;
    client.time().then(t => time = t)
    let keys = require("../key");
    const clientConnected = Binance({
      apiKey: keys.apiKey,
      apiSecret: keys.apiSecret,
      getTime: time,
    })
    let b = []
    await clientConnected.accountInfo().then(orders =>{
      b = orders.balances.filter(a => a.asset==='ETH'||a.asset==='BTC')
    })
    this.BTC = b[0].free
    this.ETH = b[1].free
    let ordre = []
    //openOrders
    //{symbol: 'ETHBTC',}
    await clientConnected.openOrders({symbol: 'ETHBTC'}).then(orders =>{
      ordre = orders
    })
    this.ordres = ordre
    let ordreDataset = []
    for( let o in ordre){
      console.log(Math.abs(this.price[this.price.length-1]-ordre[o].price))
      if(Math.abs(this.price[this.price.length-1]-ordre[o].price)<0.0005)
      ordreDataset.push({
        label: 'ordre',
        fill: false,
        tension: 0.1,
        backgroundColor: 'rgba(20,73,255,0.43)',
        borderColor: 'rgb(75, 192, 192)',
        data: this.tab(ordre[o].price)
      })
    }

    this.ordresDataset = ordreDataset
/*
{
            label: 'ordre',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(20,73,255,0.43)',
            borderColor: 'rgb(75, 192, 192)',
            data: this.tab(0.06961)
          }
 */

  },
  unmounted(){
    this.connection.close()
  },
  mounted () {
    this.fillData([10,20])
  },
  methods: {
    date(time){
      let date = new Date(time)
      return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" à "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    },
    setData(price){

      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date+' '+time;
      if(this.price.length>=100){
        this.l.shift()
        this.price.shift()
      }
      if(price!==this.price[this.price.length-1]){
        this.l.push(dateTime);
        this.price.push(price)
      }

      this.fillData(this.price)

    },
    tab(n) {
      let tab = []
      for(let i = 0;i<100;i++)
        tab.push(n)
      return tab
    },
    fillData () {
      this.datacollection = {
        labels: this.l,
        datasets: [
          {
            label: 'Cours ETH BTC',
            fill: false,
            tension: 0.1,
            backgroundColor: 'rgba(20,73,255,0.43)',
            borderColor: 'rgb(87,22,65)',
            data: this.price
          }
        ].concat(this.ordresDataset)
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
.small {
  display: block;
  width: 500px;
}
</style>
