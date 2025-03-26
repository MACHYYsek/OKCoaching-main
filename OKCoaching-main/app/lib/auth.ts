import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

// Define the UserType interface
interface UserType {
    _id: string;
    email: string;
    provider: string;
    password?: string; // Password is optional for Google users
    role: string; // Role is optional
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials?.email }).select("+password");

                if (!user) {
                    throw new Error("No user found with the email");
                }

                if (user.provider !== "credentials") {
                    throw new Error("Please use Google to log in.");
                }

                const isValidPassword = await bcrypt.compare(credentials!.password, user.password);

                if (!isValidPassword) {
                    throw new Error("Password is incorrect");
                }

                return user;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        // JWT token callback
        async jwt({ token, user, account, profile }) {
            await connectDB();
    
            if (account?.provider === "google") {
                let existingUser = await User.findOne({ email: profile?.email });
    
                if (!existingUser) {
                    existingUser = await User.create({
                        email: profile?.email,
                        provider: "google",
                        password: "",
                        userName: profile?.name,
                        role: "user",
                    });
                }
    
                token.user = existingUser as unknown as UserType;
            }
    
            if (user) {
                token.user = user as unknown as UserType;
            }
    
            // Include role in the token for further use
            const userRecord = await User.findOne({ email: (token.user as UserType).email });
            if (userRecord) {
                (token.user as UserType).role = userRecord.role;
                (token.user as UserType)._id = userRecord._id;
            }
    
            return token;
        },
    
        // Session callback
        async session({ session, token }) {
            session.user = token.user as UserType;
            return session;
        },
    },
    

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};
