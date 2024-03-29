import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { sendStatusCode } from "next/dist/next-server/server/api-utils";
import { verifyPassword } from "../../../lib/auth-util";
import { connectToDatabase } from "../../../lib/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db("auth-demo").collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          client.close();
          throw new Error("Wrong Email or password");
        }

        client.close();
        return { email: user.email }; //In next auth shows that the operation is successfull // we encode our email address in the email token
      },
    }),
  ],
});
