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
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log("Change Password Request:", values);

      const payload = {
        email,
        password: values.newPassword,
      };

      const token = localStorage.getItem("verifiedOTP") || "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.success(data.message || "Password changed successfully!");
        localStorage.removeItem("verifiedOTP");
        router.push("/");
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Logo/Decoration) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#01411C] to-[#01411C] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-center justify-center w-full h-full p-12 text-white">
          <Image
            src="/logo1.svg"
            alt="Logo"
            width={500}
            height={230}
            className="object-contain"
          />
        </div>
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full">
          <Image
            src="/Frame.png"
            alt="Decorative Frame"
            width={500}
            height={230}
            className="object-contain"
          />
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Change Password
            </CardTitle>
            <CardDescription className="text-gray-600">
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter new password"
                            type={showPassword ? "text" : "password"}
                            className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Confirm new password"
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
