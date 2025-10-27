/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { JMTable } from "@/components/ui/core/JMTable/JMTable";
import { useGetPurchasedPlansQuery } from "@/redux/features/dashboardManagementApi";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";

type PurchasedPlan = {
  id: string;
  paymentId: string;
  amount: number;
  activePlan: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  user: {
    fullName: string;
    image?: string;
  };
  Plan: {
    title: string;
    duration: number;
    price: number;
  };
};

const PurchasedPlan = () => {
  const {
    data: purchasedPlansData,
    isLoading,
    isError,
  } = useGetPurchasedPlansQuery({ limit: 5 });

  const purchasedPlans =
    purchasedPlansData?.data?.data &&
    Array.isArray(purchasedPlansData?.data?.data)
      ? purchasedPlansData.data.data
      : [];

  console.log("purchasedPlansData", purchasedPlansData);

  const columns: ColumnDef<PurchasedPlan>[] = [
    {
      accessorKey: "user.fullName",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.original.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{row.original.user?.fullName}</span>
        </div>
      ),
    },
    {
      accessorKey: "Plan.title",
      header: "Plan Title",
      cell: ({ row }) => <span>{row.original.Plan?.title}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span>Rs {row.original.amount.toFixed(2)}</span>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) =>
        row.original.startDate
          ? format(new Date(row.original.startDate), "MMMM d, yyyy")
          : "N/A",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) =>
        row.original.endDate
          ? format(new Date(row.original.endDate), "MMMM d, yyyy")
          : "N/A",
    },
    {
      accessorKey: "activePlan",
      header: "Status",
      cell: ({ row }) => {
        const active = row.original.activePlan;
        return (
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              active
                ? "bg-[#E0F8F3] text-[#00B187]"
                : "bg-[#FDEDED] text-[#FF4D4F]"
            }`}
          >
            {active ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    // {
    //   accessorKey: "action",
    //   header: "Action",
    //   cell: ({ row }) => {
    //     const planId = row.original.id;

    //     return (
    //       <div className="flex justify-center gap-3">
    //         {/* View button */}
    //         <button
    //           type="button"
    //           className="flex items-center justify-center bg-gray-100 p-2 rounded-full transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
    //           onClick={() => {
    //             setSelectedId(planId);
    //             setModalOpen(true);
    //           }}
    //           title="View details"
    //         >
    //           <Eye className="w-4 h-4 text-gray-600" />
    //         </button>

    //         {/* Delete button */}
    //         <button
    //           type="button"
    //           className="flex items-center justify-center bg-red-100 p-2 rounded-full transition-colors hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
    //           onClick={() => {
    //             setSelectedId(planId);
    //             setModalOpen(true);
    //           }}
    //           title="Delete"
    //         >
    //           <Trash2 className="w-4 h-4 text-red-600" />
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div>
      <JMTable
        columns={columns}
        data={purchasedPlans || []}
        loading={isLoading}
      />
    </div>
  );
};

export default PurchasedPlan;
