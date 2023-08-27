const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.klmvqmu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const card = client.db("SEO-page-1").collection("card");

    app.get("/", async (req, res) => {
      res.send("SEO page 1 connected");
    });
    app.get("/cards", async (req, res) => {
      const cards = await card.find().toArray();
      res.send(cards);
    });
    app.get("/cards", async (req, res) => {
      const cards = await card.find().toArray();
      res.send(cards);
    });
    app.patch("/uploadFiles/:id", async (req, res) => {
      const id = req.params.id;
      const singleCard = req.body;
      console.log(singleCard)
      const client_id = { client_id: id };
      const getCard = await card.findOne(client_id);
      const uploadsFile = getCard?.["uploads-file"];
        const uploadedFile = uploadsFile.push(singleCard?.["uploads-file"])
      const options = { upsert: true };
      const uploadFIle = {
        $set: {
          ["uploads-file"]:  uploadedFile,
        },
      };
      const result = await classCollection.updateOne(
        client_id,
        uploadFIle,
        options
      );
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("SEO page server is running");
});
