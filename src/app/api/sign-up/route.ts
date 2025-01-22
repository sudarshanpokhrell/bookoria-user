import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  dbConnect();
  try {
    const { name, email, password } = await request.json();

    const existingVerifiedUser = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          message: "User already exits with this email.",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    const verificationOTP = Math.floor(1000 + Math.random() * 90000).toString();

    if (existingUser) {
      if (existingUser.isVerified) {
        return Response.json(
          {
            message: "User already exits with this email.",
            success: false,
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verificationOTP;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 360000);
        await existingUser.save();
      }
    } else {
      const hashedPassword = bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        email,
        name,
        password,
        verifyCode: verificationOTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newUser.save();
    }

    //Verification Image sending process

    return Response.json(
      {
        success: true,
        message: "User registered, Verify the email.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error registering user.", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user.",
      },
      {
        status: 500,
      }
    );
  }
}
