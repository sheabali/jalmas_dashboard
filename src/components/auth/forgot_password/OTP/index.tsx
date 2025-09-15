"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    console.log("Submitted OTP:", enteredOtp);
    router.push("/change-password");

    try {
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#01411C] to-[#01411C] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-center justify-center w-full h-full p-12 text-white">
          <Image
            src="/logo1.svg"
            alt="HUMkadam Logo"
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

      {/* Right side with OTP form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Verification Code
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please check your email. We have sent the code for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-xl font-semibold border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                ))}
              </div>

              {/* Resend link */}
              <p className="text-sm text-center text-gray-600">
                Didn’t get a code?{" "}
                <button
                  type="button"
                  className="text-green-600 font-medium hover:underline"
                  onClick={() => console.log("Resend OTP")}
                >
                  Click to resend
                </button>
              </p>

              {/* Continue Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
