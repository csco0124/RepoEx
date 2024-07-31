import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23lijxqbhJASgqzciv",
      clientSecret: "d7f8cd429be48ee30201908072fab4d530edf670",
    }),
  ],
  secret: "qwert12345",
};
export default NextAuth(authOptions);
