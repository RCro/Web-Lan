const express = require('express')
const bodyParser = require('body-parser');
const mongo = require('mongodb')
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://admin:admin@tugas.hd9m4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const DATABASE_NAME = "Tugas"
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var database, collection

app.listen(3000,() => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
      throw error}
    database = client.db(DATABASE_NAME)
    collection = database.collection("Kalimat")
    console.log("Connected to `" + DATABASE_NAME + "`!")})})

app.get('/', (req, res) => {
  res.send(`<html>
    <body>
      <form action="/todo" method="post">
        <input name="deskripsi"/>
        <button>Add</button>
      </form>
    </body>
  </html>`)
})

app.post('/todo', (req, res)=>{
  collection.insertOne(req.body, (error, result) => {
    if(error){
      return res.status(500).send(error)}
    res.send(result.result)
  })
})


app.get('/todo', (req, res)=>{
  collection.find({}).toArray((error, result) => {
    if(error){
      return res.status(500).send(error)}
    res.send(result)
  })
})


app.delete('/todo/:id', (req, res)=>{
  collection.deleteOne({_id: req.params.id}, (error,result) =>{})
  res.json({ success: req.params.id })
})
