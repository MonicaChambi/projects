import { MongoClient } from "mongodb";
 
import express from "express"
 
const app = express();
app.use(express.json());
 
 
 
const uri = "mongodb+srv://gonzalo:QQaFD7VjCM1cxh27@proyectodb.6jmcp7x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
 
async function run(usuario) {
    try {
      const database = client.db("BaseModel");
      const payment = database.collection("Account");
      // create a document to insert
      const doc = usuario
      const result = await payment.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  app.get("/api/users", (request, response) => {
    response.send("Get Users")
  });
 
  app.post("/api/users/new", (request, response) => {
 
    run(request.body).catch(console.dir)
    response.sendStatus(200);
  });
 
 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });