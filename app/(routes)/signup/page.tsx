"use client";
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

const SignupPage = () => {

  const signupForm = useForm<SignupFields>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignupFields) => {
    console.log("submitted data : ", JSON.stringify(data, null, 2));
  };

  return (
    <main className="flex w-full min-h-screen overflow-auto">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <div className="flex items-center gap-x-2 p-5">
          <Image src={TaskFlowLogo} alt="taskflow-logo" width={50} />
          <div className="font-bold text-2xl">
            <span>Task</span>
            <span className="text-persianGreen">Flow</span>
          </div>
        </div>
        <div className="px-12 flex flex-col items-center justify-center">
          <div className="my-5 font-bold text-2xl">
            <h1>Unlock Your Productivity</h1>
            <h1>Sign up now!</h1>
          </div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="space-y-5 w-full"
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
                className="w-full flex px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
              >
                Sign up
              </Button>
              <div className="flex items-center justify-center my-2">
                <div className="flex-grow h-px bg-black dark:bg-white mr-4"></div>
                <span>or</span>
                <div className="flex-grow h-px bg-black dark:bg-white ml-4"></div>
              </div>
              <Button
                type="submit"
                className="w-full flex px-4 py-2 bg-white dark:bg-white hover:bg-white hover:dark:bg-white text-black font-bold transition duration-200 border-2 border-transparent hover:border-persianGreen"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Or sign up with google
              </Button>
              <div className="pb-4">
                Already have an account?
                <Link
                  href="./login"
                  className="text-persianGreen font-bold ml-2 underline"
                >
                  Log in
                </Link>
              </div>
            </form>
          </Form>
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
        />
      </div>
    </main >
  );
};

export default SignupPage;
