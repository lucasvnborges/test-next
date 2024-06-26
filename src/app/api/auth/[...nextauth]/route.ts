// @ts-nocheck
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user.model";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile, account }) {
      try {
        await connectToDB();
        const provider = account?.provider;
        const email = profile?.email;
        const user = await User.findOne({ $and: [{ email }, { provider }] });

        if (!user) {
          await User.create({
            email,
            provider,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture || profile?.avatar_url,
          });
        }
        return true;
      } catch (error) {
        console.error("Error: ", error?.message);
        return false;
      }
    },
    async jwt({ token, account }) {
      const provider = account?.provider;
      const email = token?.email;

      await connectToDB();
      const currentUserRecord = await User.findOne({
        $and: [{ email }, { provider }],
      });
      if (currentUserRecord) {
        token.userId = currentUserRecord._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token?.userId;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
