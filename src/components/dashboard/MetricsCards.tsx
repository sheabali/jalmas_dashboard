import { DollarSign, UserPlus, Users, UserX } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface MetricsProps {
  metrics: {
    totalUser?: number;
    blockedUser?: number;
    newUser?: number;
    totalRevenue?: number;
  };
}

const MetricsCards = ({ metrics }: MetricsProps) => {
  return (
    <div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total User */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total User</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.totalUser ?? 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blocked User */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Blocked User
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.blockedUser ?? 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <UserX className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New User */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New User</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metrics?.newUser ?? 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${metrics?.totalRevenue?.toFixed(2) ?? "0.00"}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsCards;
