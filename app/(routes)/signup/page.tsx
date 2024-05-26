"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import TaskFlowLogo from "/public/assets/taskflow-logo.svg";
import Background from "/public/assets/auth-bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { SignupSchema, SignupFields } from "./signupValidationSchema";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

const SignupPage = () => {

  const [isLoading, setLoading] = useState(false);

  const signupForm = useForm<SignupFields>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const supabase = createClientComponentClient();

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    return result;
  }

  const onSubmit = async (data: SignupFields) => {
    const result = await handleSignUp(data.email, data.password);

    setLoading(false);
    signupForm.reset();

    if (result.error) {
      toast.error("Something went wrong.", {
        description: "Please check your internet connection.",
      });
      return;
    }

    toast.success("Account successfully created", {
      description: "Check your email for validation",
    });

    const { data: response, error } = await supabase.from("users")
    .insert([{
      userId: result.data.user?.id,
      username: data.username,
      userEmail: data.email,
      userPassword: data.password
    }]);
  };

  return (
    <main className="flex w-full min-h-screen overflow-x-hidden">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <Link href="./">
          <div className="flex items-center gap-x-2 p-5 transition-all duration-300 hover:scale-105">
            <Image src={TaskFlowLogo} alt="taskflow-logo" width={50} />
            <div className="font-bold text-xl">
              <span>Task</span>
              <span className="text-persianGreen">Flow</span>
            </div>
          </div>
        </Link>
        <div className="px-12 flex flex-col items-center justify-center">
          <div className="my-5 font-bold text-2xl text-balance">
            <h1>Unlock Your Productivity</h1>
            <h1>Sign up now!</h1>
          </div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="space-y-3 w-full"
            >
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        type="username"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        type="email"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        {...field}
                        type="password"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
              >
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Sign up
              </Button>
              <Separator />
            </form>
          </Form>
          <Button
            className="mt-3 w-full flex px-4 py-2 bg-white dark:bg-white hover:bg-white hover:dark:bg-white text-black font-bold transition duration-200 border-2 border-transparent hover:border-persianGreen"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Or sign up with google
          </Button>
          <div className="pb-4 text-sm mt-3">
            Already have an account?
            <Link
              href="./login"
              className="text-persianGreen font-bold ml-2 underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-2/3 max-lg:w-1/2 max-md:hidden"
        style={{ position: "relative" }}
      >
        <Image
          alt="background-image"
          src={Background}
          fill
          style={{
            objectFit: "cover",
          }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </div>
      <Toaster richColors />
    </main>
  );
};

export default SignupPage;