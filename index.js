const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
console.log(process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5uocz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const port = 5000


const app = express()
app.use(bodyParser.json());
app.use(cors());




const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const sectorCollection = client.db("volunteerNetwork").collection("volunteer");
  
    // insert user registered sector
    app.post("registeredSector", (req,res) => {
        const selectedSector =(req.body);
        console.log(selectedSector);
    } )


  app.post( "/addSector",(req,res)=> {
      const sector = req.body;
      sectorCollection.insertOne(sector)
      .then(result => {
          console.log(result.insertedCount);
          res.send(result.insertedCount);
      })

  })

  app.get("/sector", (req,res) => {
      sectorCollection.find({})
      .toArray((err,documents) => {
          res.send(documents)
      })
  })

  app.get("/sector/:_id", (req,res)=> {
      sectorCollection.find({ _id:ObjectId(req.params._id)})
      .toArray((err, documents)=> {
          res.send(documents[0])
      })
  })
  
});





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)