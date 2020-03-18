//jshint esversion:6

const express = require('express')

const app = express();
app.get('/', function (req, res) {
    res.send("<h1>Halloooo</h1>")
})

app.get('/contact', function (req, res) {
    res.send('contact me at:rahul@gmail.com')
})

app.get('/aboutme', function (req, res) {
    res.send(`my name is K Rahul
    \n and I am a studen`)
})

app.get('/hobbies', function (req, res) {
    res.send('reading books and playing games')
})
app.listen(300, function () {
    console.log('server started')
})