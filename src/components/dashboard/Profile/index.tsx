/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number too short"),
  address: z.string().min(5, "Address too short"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Almas",
      email: "jhonalmas@gmail.com",
      phone: "7682862469469",
      address: "Aralia, Savar, Dhaka, BD",
    },
  });

  function onSubmit(values: ProfileFormData) {
    console.log("Updated Profile:", values);
    setEditMode(false);
  }

  return (
    <div className="container mx-auto mt-2 p-6">
      <div className="flex items-start justify-start">
        <h2 className="text-xl font-bold mb-4 text-green-900">Profile</h2>
      </div>
      <div className="max-w-lg mx-auto py-10">
        <Card className="bg-green-900 text-white relative">
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white"
              onClick={() => setEditMode((prev) => !prev)}
            >
              <Pencil size={18} />
            </Button>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center gap-2 mb-6">
              <Image
                src="https://i.ibb.co.com/pCzqP9S/icon-7797704-640.png"
                alt="profile"
                width={80}
                height={80}
                className="rounded-full border-2 border-white"
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!editMode}
                            placeholder="Full Name"
                            className="text-black bg-white"
                            prefix={(<User />) as any}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!editMode}
                            placeholder="Email"
                            className="text-black bg-white"
                            prefix={(<Mail />) as any}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone + Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!editMode}
                            placeholder="Phone"
                            className="text-black bg-white"
                            prefix={(<Phone />) as any}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!editMode}
                            placeholder="Address"
                            className="text-black bg-white"
                            prefix={(<MapPin />) as any}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {editMode ? (
                  <Button
                    type="submit"
                    className="w-full bg-green-700 hover:bg-green-600"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Link
                    href="/admin/dashboard/profile/change-password"
                    className="w-full bg-green-700 hover:bg-green-600"
                  >
                    <Button
                      type="button"
                      className="w-full bg-green-700 hover:bg-green-600"
                    >
                      Change Password
                    </Button>
                  </Link>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
