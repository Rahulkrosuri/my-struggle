//jshint esversion:6
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.listen('3000', function () {
    console.log('Server Started')
})


app.post('/', function (req, res) {
    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var operand = req.body.operand
    if (operand == 'add' || operand == '+') {
        var calculated = num1 + num2
        res.send('<h1>The Result is ' + calculated + '</h1>')
    }else if (operand == 'subtract' || operand == '-') {
        var calculated = num1 - num2
        res.send('<h1>The Result is ' + calculated + '</h1>')
    }else if (operand == 'multiply' || operand == '*') {
        var calculated = num1 * num2
        res.send('<h1>The Result is ' + calculated + '</h1>')
    }else if (operand == 'divide' || operand == '/') {
        var calculated = num1 / num2
        res.send('<h1>The Result is ' + calculated + '</h1>')
    }
    
    
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})