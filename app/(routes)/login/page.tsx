"use client"

import Image from "next/image";

import { FcGoogle } from "react-icons/fc";

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


const page = () => {

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
        <main className="text-white bg-c-two flex w-full h-screen">
            <div className="h-screen w-1/3 max-lg:w-1/2 max-md:w-full">
                <div className="flex items-center gap-x-2  p-5">
                    <Image
                        alt="logo"
                        src={"/assets/logo.svg"}
                        width={50}
                        height={50}
                    />
                    <div className="font-bold text-xl">
                        <span>Task<span className="text-c-one">Flow</span></span>
                    </div>
                </div>
                <div className="px-12 flex flex-col items-center justify-center">
                    <h1
                        className=" my-5 font-bold text-xl text-center"
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
                                            <Input placeholder="example@gmale.com" {...field} />
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
                                            className="text-right text-c-one underline cursor-pointer"
                                        >
                                            Forget Password?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                variant={"outline"}
                                className="border-none bg-c-one text-c-two w-full" type="submit"
                            >
                                Login
                            </Button>
                            <Separator />
                            <Button variant={"outline"} className="w-full text-c-two">
                                <FcGoogle className="mr-2 h-4 w-4" />Or log in with Google
                            </Button>
                            <span className="text-xs">
                                Dont't have an account?
                                <span className="ml-1 text-c-one cursor-pointer">
                                    Singup now
                                </span>
                            </span>
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
                />
            </div>
        </main>
    );
}

export default page;