import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth-util";
import { connectToDatabase } from "../../../lib/db-util";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req }); // getSession will look into the request,see if the session token is part of the request, if it is, it then validates and extracts that data from the cookie
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" }); //this is the code which we protect out Api route from unauthenticated access
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db("auth-demo").collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } },
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}
