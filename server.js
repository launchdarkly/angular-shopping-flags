var express = require('express')
var app = express()
var LDClient = require('ldclient-js')
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile('default.htm', { root: __dirname })
})

app.listen(3000, function () {
  console.log('Listening on 3000.')
})
