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

  // TODO: Implement functionality for handling username changes
  const handleUsernameChange = (data: UsernameField) => {
    console.log(data);
  };

  // TODO: Implement functionality for handling email changes
  const handleEmailChange = (data: EmailField) => {
    console.log(data);
  };

  // TODO: Implement functionality for handling password changes
  const handlePasswordChange = (data: PasswordField) => {
    console.log(data);
  };
  // TODO: Implement functionality for handling account deletion
  const handleAccountDelete = () => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SettingsHeader />
      <ProfileCard username="some_dummy_text" email="info@taskflow.com" />
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
                      <AlertDialogCancel className="px-4 py-2 bg-persianGreen text-black font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-black">
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
