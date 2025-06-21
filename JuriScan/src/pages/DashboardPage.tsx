// components/DashboardPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const mockActivities = [
  {
    title: "Uploaded NDA.pdf",
    description: "You uploaded a Non-Disclosure Agreement document.",
    time: "2 hours ago",
  },
  {
    title: "Hired John Doe",
    description: "You hired a Corporate Lawyer for consultation.",
    time: "Yesterday",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-4 space-y-4">
          <Button variant="outline" className="w-full justify-start text-lg">
            Home
          </Button>
          <Button variant="outline" className="w-full justify-start text-lg">
            Recent Files
          </Button>
          <Button variant="outline" className="w-full justify-start text-lg">
            Setting
          </Button>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Activity Cards */}
            {mockActivities.map((activity, index) => (
              <Card key={index} className="h-48 p-4">
                <CardContent className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold">{activity.title}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
