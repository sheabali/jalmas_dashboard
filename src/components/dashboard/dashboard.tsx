"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import MetricsCards from "./MetricsCards";

const chartData = [
  { month: "Jan", users: 45, newUsers: 32 },
  { month: "Feb", users: 78, newUsers: 65 },
  { month: "Mar", users: 52, newUsers: 28 },
  { month: "Apr", users: 95, newUsers: 82 },
  { month: "May", users: 68, newUsers: 45 },
  { month: "Jun", users: 42, newUsers: 35 },
  { month: "Jul", users: 58, newUsers: 48 },
  { month: "Aug", users: 72, newUsers: 55 },
  { month: "Sep", users: 88, newUsers: 78 },
  { month: "Oct", users: 65, newUsers: 52 },
  { month: "Nov", users: 48, newUsers: 38 },
  { month: "Dec", users: 35, newUsers: 25 },
];

const recentMessages = [
  { name: "Khukon Devops", time: "12:30 PM" },
  { name: "Khukon Devops", time: "12:30 PM" },
  { name: "Khukon Devops", time: "12:30 PM" },
];

const systemStatus = [
  { label: "API Response Time", value: "122 Ms", status: "normal" },
  { label: "Database Status", value: "Healthy", status: "healthy" },
  { label: "App Health Status", value: "Healthy", status: "healthy" },
  { label: "Error Status", value: "No", status: "success" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>
          <div className="text-sm text-gray-500">12 Jun 2024</div>
        </div>

        {/* Metrics Cards */}
        <MetricsCards />

        {/* Chart Section */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">
                User Joining Statistics
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600 border-green-500"
              >
                Monthly
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
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

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium text-gray-600 border-b pb-2">
                  <span>Name</span>
                  <span>Time</span>
                </div>
                {recentMessages.map((message, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-gray-900">
                      {message.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {message.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((status, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-gray-600">
                      {status.label}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        status.status === "healthy"
                          ? "bg-green-100 text-green-700"
                          : status.status === "success"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {status.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
