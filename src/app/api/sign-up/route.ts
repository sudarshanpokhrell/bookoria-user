import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  try {
    const { name, email, password } = await request.json();

    const existingUser = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {}
}
