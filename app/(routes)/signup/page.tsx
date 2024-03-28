"use client";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'
import TaskFlowLogo from "/public/assets/taskflow-logo.svg"
import GoogleLogo from "/public/assets/google-logo.svg"

const SignupSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }).refine(password => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password), {
    message: "Password needs uppercase, digit, and special character",
  }),
});

export type SignupFields = z.infer<typeof SignupSchema>;

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
    console.log('submitted data : ', JSON.stringify(data, null, 2));
  };

  return (
    <main className="flex min-h-screen text-white">
      <div className="w-2/5 min-h-screen bg-richBlack flex flex-col justify-between p-6">
        <div className="pt-6 py-14 pl-6">
          <header className="flex items-center">
            <Image src={TaskFlowLogo} alt="taskflow-logo" width={69} className="mr-4" />
            <span className="font-bold  text-3xl">Task</span>
            <span className="font-bold text-persianGreen text-3xl">Flow</span>
          </header>
        </div>
        <div className="flex items-center justify-center">
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="max-w-lg space-y-5"
            >
              <div className="text-3xl">
                <h1>Unlock Your Productivity</h1>
                <h1>Sign Up Now!</h1>
              </div>
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-eerieBlack border-0"
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
                        className="bg-eerieBlack border-0 "
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
                        className="bg-eerieBlack border-0"
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
                className="bg-persianGreen w-full flex gap-2 text-richBlack font-bold hover:bg-white"
              >
                Sign up
              </Button>
              <div className="flex items-center justify-center my-4">
                <div className="flex-grow h-px bg-white mr-4"></div>
                <span>or</span>
                <div className="flex-grow h-px bg-white ml-4"></div>
              </div>
              <Button
                type="submit"
                className="bg-white w-full flex gap-2 text-richBlack font-bold hover:bg-white"
              >
                <Image src={GoogleLogo} alt='google-logo' width={20} />
                Or sign up with google
              </Button>
              <p className="text-center">Already have an account?<Link href="./foo" className="text-persianGreen font-bold ml-2">Log in</Link></p>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-grow bg-background-image">
      </div>
    </main>
  );
};

export default SignupPage;
