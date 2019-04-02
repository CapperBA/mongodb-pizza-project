// app js
const express = require("express")
const app = express()
module.exports = app;

// bodyparser instantiation
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

// Tell the app to look in the public directory
app.use(express.static(__dirname + '/public'));

//database
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/pizzadb", {
    useNewUrlParser: true
})
let db = mongoose.connection
//var User = require("./models/User")

// Check for DB errors
db.on("error", function (err) {
    console.log(err)
})

// Check for DB connection
db.once("open", function () {
    console.log("Connected to MongoDB")
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index')
})


app.get('/pizza', function (req, res) {
    db.collection('pizza').find().toArray(function (error, documents) {
        // checks for errors
        if (error) throw error;
        // sends the result to the client
        res.send(documents);
    });
})


// port 
const port = process.env.port || 3000;

const server = app.listen(port, function (err) {
    if (err) console.log("There was an error starting the server on port ", server.address().port);
    console.log("Server is running on port:", server.address().port);
});