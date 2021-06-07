const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cxq2v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 8080;

//Middleware
app.use(cors());

client.connect((err) => {
  const blogCollection = client.db("dailyNews").collection("news");

  app.get("/blogs", (req, res) => {
    blogCollection.find({}).toArray((err, documents) => {
      shuffleArray(documents);
      res.send(documents);
    });
  });
});
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
const abc = 534;

app.listen(process.env.PORT || port);
