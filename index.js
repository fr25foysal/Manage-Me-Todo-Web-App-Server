const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port= process.env.PORT || 5001

app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://manageme:LkZ5gnh20SmQF9XC@cluster0.thkxg3l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Manage Me Server!')
})

const userCollection =client.db('manageme').collection('users')
const taskCollection = client.db('manageme').collection('tasks')

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    app.post('/tasks',async(req,res)=>{
      const task = req.body
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`ManageMe Server ${port}`)
  })