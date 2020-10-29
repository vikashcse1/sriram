const express = require('express')
const path = require('path')
const bodyparser= require('body-parser')

const nodemailer = require('nodemailer'); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'ssrvivahbhawan@gmail.com', 
        pass: 'ssrvivahbhawan@123'
    } 
}); 

const app = express()
app.use(express.static('event'))
app.use(bodyparser.urlencoded({ extended: true }))

//-----------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'student';
 
// Use connect method to connect to the server

//-----------------------------------------------------------------------------------------

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

app.get('/book', (req, res) => {
	res.sendFile(path.join(__dirname, 'event/index.html'));
})

const insertDocuments = function(name,email,ename,msg) {
// Use connect method to connect to the server
MongoClient.connect(url,{ useUnifiedTopology: true } , function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  // Get the documents collection
  const collection = db.collection('student');
  // Insert some documents
  collection.insertOne(
    {name : name,email:email,evt:ename,msg:msg}
  , function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 documents into the collection");
    //callback(result);
	client.close();
  });

})
}
const mailer=function(name,email,query){
	let mailDetails = { 
    from: 'ssrvivahbhawan@gmail.com', 
    to: 'vikashdevil@gmail.com', 
    subject: name+" , "+email, 
    html:'<h1>'+name+'</h1><h1>'+email+'</h1><h1>'+query+'</h1>'
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 
}


const insertQuery = function(name,email,Query) {
// Use connect method to connect to the server
MongoClient.connect(url,{ useUnifiedTopology: true } , function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  // Get the documents collection
  const collection = db.collection('query');
  // Insert some documents
  collection.insertOne(
    {name : name,email:email,Query:Query}
  , function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 documents into the collection");
	mailer(name,email,Query)
    //callback(result);
	client.close();
  });

})
}

app.post('/book', (req, res) => {
res.sendFile(path.join(__dirname, 'event/index.html'));

insertDocuments(req.body.name,req.body.email,req.body.ename,req.body.msg)

})

app.post('/contactus', (req, res) => {
res.sendFile(path.join(__dirname, 'event/index.html'));

insertQuery(req.body.name,req.body.email,req.body.Query)

})

app.listen(3000, () => {
	console.log('server is running on port 3000')
})