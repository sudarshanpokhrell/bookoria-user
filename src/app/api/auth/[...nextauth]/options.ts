import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define proper types for our user
interface User {
  _id: string;
  email: string;
  isVerified: boolean;
  name: string;
  password?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        
      ): Promise<User | null> {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          if (!credentials.password) {
            throw new Error("Password is required");
          }

          const isPasswordCorrect = user.password
            ? await bcrypt.compare(credentials.password, user.password)
            : false;

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials. Please check your email and password.");
          }

          return {
            _id: user._id.toString(),
            email: user.email,
            isVerified: user.isVerified,
            name: user.name,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unexpected error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.email = user.email;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session & { user: Partial<User> };
      token: JWT & Partial<User>;
    }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
