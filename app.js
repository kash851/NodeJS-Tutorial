//Required for MongoDB use
const {MongoClient} = require('mongodb')
const client = new MongoClient("mongodb://127.0.0.1:27017");
//Change these to your collection and database name 
const dbName = 'site';
const collectionName = "Song Reviews"

//ExpressJS setup
const express = require('express')
app = express()
//helper methods
const path = require('path')
const bodyParser = require('body-parser')

//Required to take application/json requests
app.use(bodyParser.json());
//Sets up the public asset directory
app.use(express.static(path.join(__dirname,"/public")))


app.use(express.static('public'))

async function dataBaseing(req, res, next){
    await client.connect()
    let payload = req.body.data
    const collection = client.db(dbName).collection(collectionName)
    let data = await collection.find(
        {"artist" : payload}
        ).toArray()
    res.type('json')
    res.send(data)
}

app.get('/', (req,res) =>{res.sendFile("./index.html")})

app.post('/data', dataBaseing, (req, res)=>
{       
})


app.listen(8000, ()=>{
    console.log('Listening on port 8000')
    })