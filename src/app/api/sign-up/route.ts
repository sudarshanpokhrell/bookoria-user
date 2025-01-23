import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
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

    const verificationOTP = Math.floor(100000 + Math.random() * 900000).toString();

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
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        email,
        name,
        password:hashedPassword,
        verifyCode: verificationOTP,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newUser.save();
    }

    //Verification Image sending process
    const emailResponse = await sendVerificationEmail(
      email,
      name,
      verificationOTP
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
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
