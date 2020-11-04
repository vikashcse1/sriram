const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/event"));

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


//-----------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'student';
 

const insertQuery = function(name,email,phone,msg,amount,orderId) {
// Use connect method to connect to the server
MongoClient.connect(url,{ useUnifiedTopology: true } , function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  // Get the documents collection
  const collection = db.collection('query');
  // Insert some documents
  collection.insertOne(
    {name : name,email:email,phone:phone,msg:msg,amount:amount,orderId:orderId}
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

//-----------------------------------------------------------------------------------------



app.get("/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.post("/paynow", (req, res) => {
	insertQuery(req.body.name,req.body.email,req.body.phone,req.body.msg,req.body.amount,req.body.orderId)
    initPayment(req.body.amount,req.body.name,req.body.orderId).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});


app.post("/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});
