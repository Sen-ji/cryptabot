const Binance = require('binance-api-node').default
const fs = require('fs');
const client = Binance()
/*
'APIKEY':'<q178cjP2EOA2OK3Kl6vEagSQgxrIa6O5RV5V24AtmeFfrHMiByXelqDeRL7XVJgW>',
  'APISECRET':'<jM0eyUAZrSOdbExQ3tnOvzwyuQwRxaQvHyEaGQQ9vduZdcNnLfUQXLqgpOb3pGEJ>'

*/
// Authenticated client, can make signed calls
let time;
let ordres = []
let vente = 0
client.time().then(t => time = t)
let keys = require("./key");
const client2 = Binance({
  apiKey: keys.apiKey,
  apiSecret: keys.apiSecret,
  getTime: time,
})

//client.time().then(time => console.log(time))

client2.openOrders({ symbol: 'ETHBTC' }).then(orders => {
  for (o in orders) {
    console.log(orders[o].side + " " + orders[o].price)
  }
})
//client2.myTrades({ symbol: 'ETHBTC' }).then(orders => console.log(orders))
var pa = 0;
var ord = {}
var boucle = 0
var ladate=new Date()
var v = 0
fs.readFile("./ordre.json",'utf8',(err,data)=>{
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    const orders = JSON.parse(data);
    for(a in orders){
      console.log(orders[a])
      ordres.push(Number(orders[a]))
    }

    console.log(ordres)
  }
})
console.log("start, il est "+ladate.getHours()+":"+ladate.getMinutes()+":"+ladate.getSeconds())
setInterval(async () => {
  ladate=new Date()
  console.log("Nouvelle boucle, nb +" + boucle + "! " + v +" "+ladate.getHours()+":"+ladate.getMinutes()+":"+ladate.getSeconds())
  boucle +=1
  let minVente = 1
  let nbSell = 0
  await client2.openOrders({ symbol: 'ETHBTC' }).then(orders => ord = orders)
  await client2.prices({ symbol: 'ETHBTC' }).then(prices => pa = prices)


  for (o in ord) {
    if (ord[o].side == "SELL")
      nbSell += 1
    if (ordres.indexOf((Number(ord[o].price))) == -1 && ord[o].side == "SELL") {
      ordres.push((Number(ord[o].price)))
      console.log("add " + (ord[o].price))
    }
    if (ord[o].side == "SELL" && ord[o].price < minVente) {
      minVente = ord[o].price
    }
  }

  ordres.sort()
  console.log(ordres)
  console.log('nb sell'+ nbSell)
  console.log("minvente final :" + minVente)

  let supp = []
  for (let i = 0; i < (ordres.length - nbSell); i++) {
    if (pa.ETHBTC < (ordres[i] - 0.0002)) {
      console.log("Make ORDER BUY !" + pa.ETHBTC + " " + (ordres[i] - 0.0002) + " " + nbSell + " " + ordres.length)
      await client2.order({
        symbol: 'ETHBTC',
        side: 'BUY',
        quantity: '0.002',
        price: Math.round((Number(pa.ETHBTC) - 0.000005)*1000000)/1000000,
      }).then(orders => {
        console.log(orders)
        supp.push(i)
      }).catch(e => {
        console.log("achat impossible")
        console.log(e)
      })
    }
  }
  console.log(supp)
  ordres.splice(supp[0], supp.length)

  if ((Number(pa.ETHBTC) + 0.00040) < minVente) {
    console.log(pa.ETHBTC + " ok..." + Math.round((Number(pa.ETHBTC) + Number(0.00020))*1000000)/1000000)
    console.log("Make ORDER sell! a " + Math.round((Number(pa.ETHBTC) + Number(0.00020))*1000000)/1000000)
    client2.order({
      symbol: 'ETHBTC',
      side: 'SELL',
      quantity: '0.002',
      price: Math.round((Number(pa.ETHBTC) + Number(0.00020))*1000000)/1000000,
    }).then(orders => {
      console.log("add order" + Math.round((Number(pa.ETHBTC) + Number(0.00020))*1000000)/1000000)
      console.log(orders)
      ordres.push(Math.round((Number(pa.ETHBTC) + Number(0.00020))*1000000)/1000000)
    }).catch(e => {
      console.log("vente impossible")
      console.log(e)
    })

  }
  fs.writeFile("./ordre.json",JSON.stringify(ordres), 'utf8', (err) => {

    if (err) {
      console.log(`Error writing file: ${err}`);
    } else {
      console.log(`File is written successfully!`);
    }

  })
}, 600000);
