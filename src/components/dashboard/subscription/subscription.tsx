/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/features/dashboardManagementApi";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Plan = {
  id: string;
  title: string;
  featured: string[];
  duration: number; // in days
  price: number;
  isDeleted: boolean;
};

type NewPlanFormData = {
  planName: string;
  price: string;
  duration: string;
  features: string[];
};

export default function SubscriptionPage() {
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<NewPlanFormData | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  //create plan
  const [createPlan, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();

  //update plan
  const [updatePlan, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();

  //get all plans
  const { data: planData, isLoading } = useGetAllSubscriptionsQuery({});
  const plans: Plan[] = planData?.data || [];

  //form
  const { register, handleSubmit, reset, setValue } = useForm<NewPlanFormData>({
    defaultValues: {
      planName: "",
      price: "",
      duration: "",
      features: ["", "", "", ""],
    },
  });

  // Prefill modal form when editing
  useEffect(() => {
    if (editingPlan) {
      setValue("planName", editingPlan.planName);
      setValue("price", editingPlan.price);
      setValue("duration", editingPlan.duration);
      editingPlan.features.forEach((f, i) =>
        setValue(`features.${i}` as const, f)
      );
    } else {
      reset();
    }
  }, [editingPlan, reset, setValue]);

  const handleEditClick = (plan: Plan) => {
    const features = [...plan.featured];
    while (features.length < 4) features.push(""); // fill up to 4 inputs

    setEditingPlan({
      planName: plan.title,
      price: plan.price.toString(),
      duration: plan.duration.toString(),
      features,
    });
    setEditingPlanId(plan.id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    setEditingPlanId(null);
  };

  const onSubmit = async (data: NewPlanFormData) => {
    console.log("data", data);

    try {
      // ✅ Ensure proper type conversion and validation
      const duration = Number(data.duration);
      const price = Number(data.price);

      if (isNaN(duration) || isNaN(price)) {
        toast.error(
          "Please enter valid numeric values for duration and price."
        );
        return;
      }

      // ✅ Match backend expected format
      const payload = {
        title: data.planName.trim(),
        featured: data.features.filter((f) => f.trim() !== ""), // remove empty strings
        duration,
        price: Number(price),
      };

      console.log("Final Payload:", payload);

      // Check if we're editing or creating
      if (editingPlanId) {
        // Update existing plan
        const res = await updatePlan({
          id: editingPlanId,
          data: payload,
        }).unwrap();

        if (res.success) {
          toast.success(res.message || "Plan updated successfully!");
          setIsModalOpen(false);
          setEditingPlan(null);
          setEditingPlanId(null);
          reset();
        } else {
          toast.error(res.message || "Plan update failed!");
        }
      } else {
        // Create new plan
        const res = await createPlan(payload).unwrap();

        if (res.success) {
          toast.success(res.message || "Plan created successfully!");
          setIsModalOpen(false);
          setEditingPlan(null);
          reset();
        } else {
          toast.error(res.message || "Plan creation failed!");
        }
      }
    } catch (error: any) {
      console.error("Error saving plan:", error);
      toast.error(
        error?.data?.message || "Something went wrong while saving the plan."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Subscription
        </h1>

        {/* Current Plans Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Current Plans</h2>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setEditingPlan(null);
                setEditingPlanId(null);
                setIsModalOpen(true);
              }}
            >
              Add New Plan
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-10 text-center text-gray-500">
                Loading plans...
              </div>
            ) : plans.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No plans available
              </div>
            ) : (
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
                  {plans.map((plan) => (
                    <tr
                      key={plan.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-gray-900">{plan.title}</td>
                      <td className="py-4 px-4 text-gray-900">
                        {plan.price} PKR
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {plan.duration} days
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {plan.featured.join(", ")}
                      </td>
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
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-2xl bg-green-700 border-green-600">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white text-sm">Plan Name</Label>
              <Input
                className="bg-white border-white"
                {...register("planName", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Price</Label>
              <Input
                className="bg-white border-white"
                {...register("price", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Duration (days)</Label>
              <Input
                className="bg-white border-white"
                {...register("duration", { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Features</Label>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <Input
                    key={i}
                    className="bg-white border-white"
                    {...register(`features.${i}` as const)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-800 text-white"
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : editingPlan
                  ? "Update"
                  : "Add"}
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
