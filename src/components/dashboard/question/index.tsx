"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const subscriptionPlans = [
  {
    name: "Annual",
    price: "5000 PKR",
    duration: "Yearly",
    features: 4,
  },
  {
    name: "Month",
    price: "1000 PKR",
    duration: "Monthly",
    features: 2,
  },
  {
    name: "Week",
    price: "100 PKR",
    duration: "Weekly",
    features: 1,
  },
  {
    name: "Preview",
    price: "25 PKR",
    duration: "One Time",
    features: 1,
    hasAvatar: true,
  },
  {
    name: "Single Course",
    price: "3000 PKR",
    duration: "3 Month",
    features: 1,
  },
  {
    name: "1-1 Live Coaching",
    price: "1000 PKR",
    duration: "One Time",
    features: 1,
  },
];

type NewPlanFormData = {
  planName: string;
  price: string;
  duration: string;
  features: string[];
};

export default function QuestionManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<NewPlanFormData | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<NewPlanFormData>({
    defaultValues: {
      planName: "",
      price: "",
      duration: "",
      features: ["", "", "", ""],
    },
  });

  useEffect(() => {
    if (editingPlan) {
      setValue("planName", editingPlan.planName);
      setValue("price", editingPlan.price);
      setValue("duration", editingPlan.duration);
      editingPlan.features.forEach((feature, index) => {
        setValue(`features.${index}` as const, feature);
      });
    } else {
      reset();
    }
  }, [editingPlan, reset, setValue]);

  const onSubmit = (data: NewPlanFormData) => {
    if (editingPlan) {
      console.log("Updated plan data:", data);
    } else {
      console.log("New plan data:", data);
    }
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleEditClick = (plan: (typeof subscriptionPlans)[0]) => {
    const featureData: string[] = [];
    if (plan.features === 4) {
      featureData.push(
        "Give Unlimited Test",
        "Premium Support",
        "Always Accessible",
        "Save Money Package"
      );
    } else if (plan.features === 2) {
      featureData.push("Feature 1", "Feature 2");
    } else if (plan.features === 1) {
      featureData.push("Feature 1");
    }

    setEditingPlan({
      planName: plan.name,
      price: plan.price.replace(" Rs", ""),
      duration: plan.duration.toLowerCase().replace(" ", "-"),
      features: featureData,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Question</h1>

        {/* Current Plans Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">
                Current Plans
              </h2>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-profile-avatars.png" />
                <AvatarFallback>👨‍💼</AvatarFallback>
              </Avatar>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setEditingPlan(null);
                setIsModalOpen(true);
              }}
            >
              Add New Plan
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Plan Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Features
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptionPlans.map((plan, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900">{plan.name}</span>
                        {plan.hasAvatar && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/small-profile.jpg" />
                            <AvatarFallback>👤</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{plan.price}</td>
                    <td className="py-4 px-4 text-gray-600">{plan.duration}</td>
                    <td className="py-4 px-4 text-gray-900">{plan.features}</td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditClick(plan)}
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal dialog for adding/editing new plan */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-2xl bg-green-700 border-green-600">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-xl font-medium">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="planName" className="text-white text-sm">
                Plan Name
              </Label>
              <Input
                id="planName"
                placeholder="Enter The Name"
                className="bg-white border-white"
                {...register("planName", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-white text-sm">
                Price
              </Label>
              <Input
                id="price"
                placeholder="Enter The Price"
                className="bg-white border-white"
                {...register("price", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-white text-sm">
                Duration
              </Label>
              <Select
                onValueChange={(value) => setValue("duration", value)}
                value={editingPlan?.duration || ""}
              >
                <SelectTrigger className="bg-white border-white">
                  <SelectValue placeholder="Select Here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="3-month">3 Month</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-time">One Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Feature</Label>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((index) => (
                  <Input
                    key={index}
                    placeholder="Write Here"
                    className="bg-white border-white"
                    {...register(`features.${index}` as const)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-800 text-white"
              >
                {editingPlan ? "Done" : "Add"}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
