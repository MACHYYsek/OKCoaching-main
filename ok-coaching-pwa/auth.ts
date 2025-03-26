import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // TODO: Replace with actual database lookup
        const mockUser = {
          id: "1",
          email: "test@example.com",
          name: "Test User",
          // Password: "password123"
          hashedPassword: "$2a$10$IiXve0Cz6KFJxK9zKZP3.OqQ0C/j7Uj7y2QvG5/q.3qR6oJ6kzHe2",
        };

        if (email !== mockUser.email) {
          return null;
        }

        const isValid = await bcrypt.compare(password, mockUser.hashedPassword);

        if (!isValid) {
          return null;
        }

        return {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});