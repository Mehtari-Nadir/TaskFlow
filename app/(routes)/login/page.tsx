"use client"

import Image from "next/image";

import { z } from "zod";
import formSchema from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        form.reset();
    }

    return (
        <main className="flex w-full h-screen">
            <div className="h-screen w-1/3 max-lg:w-1/2 max-md:w-full">
                <Link href="./">
                    <div className="flex items-center gap-x-2 p-5 transition-all duration-300 hover:scale-105">
                        <Image
                            alt="logo"
                            src={"/assets/taskflow-logo.svg"}
                            width={50}
                            height={50}
                        />
                        <div className="font-bold text-xl">
                            <span>Task<span className="text-c-one">Flow</span></span>
                        </div>
                    </div>
                </Link>
                <div className="px-12 flex flex-col items-center justify-center">
                    <h1
                        className=" my-5 font-bold text-xl text-center text-balance"
                    >
                        Welcome Back! Log In to Supercharge Your Productivity!
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="**********" {...field} />
                                        </FormControl>
                                        <FormDescription
                                            className="text-right font-bold text-c-one underline cursor-pointer"
                                        >
                                            Forget Password?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full flex px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen"
                            >
                                Login
                            </Button>
                            <Separator />
                            <Button
                                type="submit"
                                className="w-full flex px-4 py-2 bg-white dark:bg-white hover:bg-white hover:dark:bg-white text-black font-bold transition duration-200 border-2 border-transparent hover:border-persianGreen"
                            >
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Or sign up with google
                            </Button>
                            <div className="text-sm">
                                Don&apos;t have an account?
                                <Link
                                    href="./signup"
                                    className="text-persianGreen font-bold ml-2 underline"
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="h-screen w-2/3 max-lg:w-1/2 max-md:hidden" style={{ position: "relative" }}>
                <Image
                    alt="background image"
                    src={"/assets/auth-bg.jpg"}
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
            </div>
        </main>
    );
}

export default LoginPage;