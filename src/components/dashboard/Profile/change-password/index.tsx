/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useChangePasswordAdminMutation } from "@/redux/features/dashboardManagementApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters."),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters.")
    .refine((val) => !val.includes(" "), {
      message: "New password cannot contain spaces.",
    }),
});

export default function ChangePasswordWithDashboard() {
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordAdminMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Change Password Request:", values);

    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res?.success) {
        toast.success(res.message || "Password changed successfully!");
        router.push("/");
      } else {
        toast.error(
          res?.message || "Failed to change password. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md bg-[#01411C] shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl text-white font-bold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Old Password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Old Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter old password"
                        className="h-12 border-gray-200 bg-white focus:border-green-500 focus:ring-green-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="h-12 border-gray-200 bg-white focus:border-green-500 focus:ring-green-500 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePasswordVisibility}
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
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
