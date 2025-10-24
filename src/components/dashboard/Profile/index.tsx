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
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/dashboardManagementApi";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner"; // or your toast library

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { data: userData, refetch } = useGetUserQuery({});
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
  const user = userData?.data;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
    },
    values: {
      fullName: user?.fullName || "",
      email: user?.email || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: ProfileFormData) {
    try {
      const formData = new FormData();

      // Create data object matching backend structure
      const data = {
        fullName: values.fullName,
      };

      formData.append("data", JSON.stringify(data));

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateProfile(formData).unwrap();

      toast.success("Profile updated successfully!");
      setEditMode(false);
      setSelectedImage(null);
      setPreviewUrl("");
      refetch();
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }

  const displayImage =
    previewUrl ||
    user?.image ||
    "https://i.ibb.co.com/pCzqP9S/icon-7797704-640.png";

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
            <div className="flex flex-col items-center gap-2 mb-6 relative">
              <div className="relative">
                <Image
                  src={displayImage}
                  alt="profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white object-cover"
                />
                {editMode && (
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-white text-green-900 rounded-full p-1.5 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <Camera size={16} />
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
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
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!editMode}
                            placeholder="Full Name"
                            className="text-black bg-white"
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
                            disabled={true}
                            placeholder="Email"
                            className="text-black bg-white"
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
                    disabled={isLoading}
                    className="w-full bg-green-700 hover:bg-green-600"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                ) : (
                  <Link
                    href="/admin/dashboard/profile/change-password"
                    className="w-full"
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
