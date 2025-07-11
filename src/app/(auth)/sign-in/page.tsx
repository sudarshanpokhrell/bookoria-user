"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast({
          title: "Login Failed",
          description: result.error || "Incorrect credentials",
          variant: "destructive",
        });
      } else {
        router.replace("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Login Failed",
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
            Sign In to continue
          </h2>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm pb-0">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl"
                          placeholder="Enter your email"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm pb-0">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="rounded-xl"
                          placeholder="Password"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="text-center mt-4">
            <p>
              Don't have account?{" "}
              <Link
                href="/sign-up"
                className="text-[#463F3A] hover:text-gray-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
