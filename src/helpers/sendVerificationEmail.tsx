import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Bookoria || Verifcation Code",
      react: VerificationEmail({ name, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Verification email send successfully !!",
    };
  } catch (error) {
    console.error("Error sending verification Email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
