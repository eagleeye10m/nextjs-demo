import { MongoClient, ServerApiVersion } from "mongodb";

// /api/contacts    we will send requests to this url address

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    //Store it in the database
    const newMessage = {
      name,
      email,
      message,
    };

    let connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gukmwlj.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(
      "mongodb+srv://eagleeye10m:ali109832@cluster0.gukmwlj.mongodb.net/?retryWrites=true&w=majority",
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: false,
          deprecationErrors: true,
        },
      },
    );

    async function run() {
      const myDatabase = process.env.mongodb_database;
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
      } catch (error) {
        res.status(500).json({ message: "Could not connect to database." });
        return;
      }

      try {
        const db = client.db("my-site");
        const result = await db.collection("Messages").insertOne(newMessage);
        newMessage.id = result.insertedId;
      } catch (error) {
        client.close();
        res.status(500).json({ message: "Storing message failed!" });
        return;
      }
      res
        .status(201)
        .json({ message: "Successfully stored message!", message: newMessage });
      client.close();
    }
    run().catch(console.dir);
  }
}
