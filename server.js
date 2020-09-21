//Go into nodemodules and use express
const express = require('express')
//app is the express function
const app = express()
//go into modules and use body parser, allows it grab things from the index.ejs
const bodyParser = require('body-parser')
//go into nodemodules and use mongodb
const MongoClient = require('mongodb').MongoClient
//
var db, collection;

const url = "mongodb+srv://CarolinD:Carolin23!@cluster0.v6hrh.mongodb.net/todofull?retryWrites=true&w=majority";
const dbName = "todofull";

//creates server and connects it your database
app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});
//use everything inside the public file and recreate it
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
//
app.use(bodyParser.json())

app.use(express.static('public'))
//going into the root folder (like home page)
app.get('/', (req, res) => {
  db.collection('todofull').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {todofull: result})
  })
})

app.post('/todofull', (req, res) => {
  db.collection('todofull').insertOne({name: req.body.name}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/strike', (req, res) => {
  db.collection('list').findOneAndDelete({
    toDo: req.body.toDo
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/todofull', (req, res) => {
  db.collection('todofull').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
