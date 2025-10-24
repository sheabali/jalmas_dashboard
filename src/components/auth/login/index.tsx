/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login_user, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await login_user(values).unwrap();

      if (res?.success) {
        toast.success(res.message || "Login successful!");
        const token = res.data.token;
        setCookie(token);

        const user = jwtDecode<JwtPayload>(token);
        dispatch(setUser({ token, user }));

        router.push("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed!");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Something went wrong during login.");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#01411C] to-[#01411C] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex items-center justify-center w-full h-full p-12 text-white">
          <div className="flex items-center justify-center">
            <Image
              src="/logo1.svg"
              alt="HUMkadam Logo"
              width={500}
              height={230}
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute top-20 right-20 w-32 h-32 rounded-full">
          <Image
            src="/Frame.png"
            alt="Decor"
            width={500}
            height={230}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Continue managing your app efficiently.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link href="/forgot-password">
                    <Button
                      variant="link"
                      className="px-0 text-sm text-gray-600 hover:text-green-600"
                      type="button"
                    >
                      Forgot Password?
                    </Button>
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
