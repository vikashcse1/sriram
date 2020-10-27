const express = require('express')
const path = require('path')
const bodyparser= require('body-parser')


const app = express()
app.use(express.static('event'))
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})

app.get('/home', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})

app.get('/aboutus', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})

app.get('/contactus', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})


app.listen(3000, () => {
	console.log('server is running on port 3000')
})