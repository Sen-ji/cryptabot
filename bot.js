const Binance = require('binance-api-node').default
const fs = require('fs');
const client = Binance()
let time;
client.time().then(t => time = t)
client.time().then(time => console.log(time))
let keys = require("./key");
const clientConnected = Binance({
    apiKey: keys.apiKey,
    apiSecret: keys.apiSecret,
    getTime: time,
})
