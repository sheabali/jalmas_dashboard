/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardDataQuery } from "@/redux/features/dashboardManagementApi";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import MetricsCards from "./MetricsCards";

const Dashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardDataQuery({});

  // Extract data safely
  const metrics = dashboardData?.data?.overView || {};
  const monthlyUserStats = dashboardData?.data?.monthlyUserStats || [];

  const chartData =
    monthlyUserStats.length > 0
      ? monthlyUserStats.map((item: any) => ({
          month: item.month.slice(0, 3), // short month name
          users: item.count,
          newUsers: item.count, // You can adjust if backend gives separate fields
        }))
      : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading dashboard data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Metrics Cards */}
        <MetricsCards metrics={metrics} />

        {/* Chart Section */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                User Joining Statistics
              </CardTitle>
              {/* <Button
                variant="outline"
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600 border-green-500"
              >
                Monthly
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />
                  <YAxis hide />
                  <Bar
                    dataKey="users"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    opacity={0.7}
                  />
                  <Bar
                    dataKey="newUsers"
                    fill="#059669"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Other sections (Recent Messages, System Status) */}
        {/* You can keep your existing implementation for these */}
      </div>
    </div>
  );
};

export default Dashboard;
