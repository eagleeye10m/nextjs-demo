import { hashPassword } from "../../../lib/auth-util";
import { connectToDatabase } from "../../../lib/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid input- Password should be at least 7 characters long",
      });
    }
    // let db;
    // try {
    //   db = client.db("auth-demo");
    // } catch (error) {
    //   client.close();
    //   return;
    // }
    let db;
    let client;
    try {
      client = await connectToDatabase();
      db = client.db("auth-demo");
    } catch (error) {
      res.status(422).json({ message: "connecting to database failed" });
      client.close();
      return;
    }

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    try {
      const result = await db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Created new user!" });
    } catch (error) {
      res.status(400).json({ message: error });
      return;
    } finally {
      client.close();
    }
  }
}
