import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/UserModel";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        const dbconn = await dbConnect();
        const currentUser = await UserModel.findOne({ email: user.email });
        console.log('its details:',user,currentUser)

        if (!currentUser) {
          const newUser = await UserModel.create({
            username: user.name,
            email:user.email,
            profilepic: user.image,
          });
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
