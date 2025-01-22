import UserModel from "@/model/User";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, code } = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User doesn't exits",
        },
        {
          status: 404,
        }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "User verifed",
        },
        {
          status: 200,
        }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Verification code is incorrect",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired, Please signup again",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user.",
      },
      {
        status: 500,
      }
    );
  }
}
