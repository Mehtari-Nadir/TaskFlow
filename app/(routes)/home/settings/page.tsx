"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SettingsHeader from "@/app/_components/settings/SettingsHeader";
import ProfileCard from "@/app/_components/settings/ProfileCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  UsernameSchema,
  EmailSchema,
  PasswordSchema,
  UsernameField,
  EmailField,
  PasswordField,
} from "./settingsSchema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import Lenis from "lenis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { useUserStore } from "@/app/_providers/user-store-provider";
import { useRouter } from "next/navigation";

const Settings = () => {
  const usernameForm = useForm<UsernameField>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const emailForm = useForm<EmailField>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<PasswordField>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const supabase = createClientComponentClient();
  const { users, updateUser, removeUser } = useUserStore((state) => ({
    users: state.users[0],
    updateUser: state.updateUser,
    removeUser: state.removeUser,
  }));
  const { userEmail, userId, userPassword, username, userPic } = users;

  const handleUsernameChange = async ({
    username: newUsername,
  }: UsernameField) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ username: newUsername })
        .eq("userId", userId);
      updateUser(userId, newUsername, userEmail, userPassword, userPic);
      if (error) throw error;
      toast.success("Username updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating your username");
    } finally {
      usernameForm.reset();
    }
  };
  const handleEmailChange = async ({ email }: EmailField) => {
    if (email === userEmail) return toast.error("Email is already in use");
    try {
      const { error } = await supabase.auth.updateUser(
        {
          email,
        },
        { emailRedirectTo: `${window.location.origin}/home/settings` },
      );
      if (error) throw error;
      const { error: updateError } = await supabase
        .from("users")
        .update({ userEmail: email })
        .eq("userId", userId);
      if (updateError) throw updateError;
      updateUser(userId, username, email, userPassword, userPic);
      toast.success(
        "Email updated successfully. Please check your new email for confirmation.",
      );
    } catch (error) {
      toast.error("An error occurred while updating your email");
    } finally {
      emailForm.reset();
    }
  };
  const handlePasswordChange = async ({
    password,
    newPassword,
  }: PasswordField) => {
    if (password !== userPassword)
      return toast.error("Current password is incorrect");
    try {
      const { error } = await supabase.auth.updateUser(
        {
          password: newPassword,
        },
        { emailRedirectTo: `${window.location.origin}/home/settings` },
      );
      if (error) throw error;
      const { error: updateError } = await supabase
        .from("users")
        .update({ userPassword: newPassword })
        .eq("userId", userId);
      if (updateError) throw updateError;
      updateUser(userId, username, userEmail, newPassword, userPic);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating your password");
    } finally {
      passwordForm.reset();
    }
  };
  const router = useRouter();
  const handleAccountDelete = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("userId", userId);
      if (error) throw error;
      toast.success("Account deleted successfully");
      removeUser(userId);
    } catch (error) {
      toast.error("An error occurred while deleting your account");
    }
  };
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SettingsHeader />
      <ProfileCard {...users} />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <Form {...usernameForm}>
                <form
                  onSubmit={usernameForm.handleSubmit(handleUsernameChange)}
                >
                  <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>Change username</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={usernameForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Username"
                              {...field}
                              type="username"
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen "
                    >
                      Change
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(handleEmailChange)}>
                  <CardHeader>
                    <CardTitle>Email address</CardTitle>
                    <CardDescription>Change email address</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              type="email"
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen "
                    >
                      Change
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                >
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change password</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Current password"
                              {...field}
                              type="password"
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="New Password"
                              {...field}
                              type="password"
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-sm" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen "
                    >
                      Change
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Manage account</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-red-400 text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-400 "
                    >
                      Delete account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-persianGreen">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="px-4 py-2 bg-red-400 text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-400 "
                        onClick={handleAccountDelete}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Settings;
