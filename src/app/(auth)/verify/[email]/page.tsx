"use client";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/ApiResponse";
import { toast, useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function Verify() {
  const router = useRouter();
  const { email } = useParams(); // Ensure `email` is passed correctly

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "", // OTP field
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      // Mock API call
      const response = await axios.post<ApiResponse>("/api/verify-code", {
        email: atob(decodeURIComponent(email as string)), // Decoding email from params
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed",
        description: axiosError.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-[#F5F5F5] p-4 sm:p-8">
      <div className="bg-white flex flex-col gap-8 align-center w-full max-w-md lg:max-w-[30rem] p-6 rounded-xl shadow-md">
        <div className="mt-3">
          <h1 className="text-3xl uppercase font-bold text-center">Bookoria</h1>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold text-[#463F3A] my-5 text-center capitalize">
            Verify your email.
          </h2>
          <p className="text-lg text-center">We have sent a 6-digit code to your email.</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-5"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <InputOTPGroup className="w-full flex gap-2 justify-center">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              className="w-12 h-12 border-2 border-[#463F3A] rounded-xl text-xl text-center focus:border-blue-500 focus:outline-none"
                              key={index}
                              index={index}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm mt-2 text-center"/>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-black rounded-xl mt-6 hover:bg-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
