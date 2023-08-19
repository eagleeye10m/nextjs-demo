const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export async function connectToDatabase() {
  const client = new MongoClient(
    "mongodb+srv://eagleeye10m:ali109832@cluster0.gukmwlj.mongodb.net/?retryWrites=true&w=majority",
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    },
  );
  // Connect the client to the server	(optional starting in v4.7)

  return client.connect();
}
