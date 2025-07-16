import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#0e0e0e] text-white">
        {/* Sidebar */}
        <aside className="w-72 p-4 bg-[#111111] border-r border-gray-800 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start text-left text-white font-medium hover:bg-[#1a1a1a] hover:text-amber-50">
              New Chat
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white font-medium hover:bg-[#1a1a1a] hover:text-amber-50">
              Recent Files
            </Button>
            <Button variant="ghost" className="justify-start text-left text-white font-medium hover:bg-[#1a1a1a] hover:text-amber-50">
              Setting
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-white">Recent Activity</h2>
            <div className="flex flex-col gap-2 space-y-1">
              {mockActivities.map((activity, index) => (
                  <Button key={index} variant="ghost" className="justify-start text-left text-white font-medium hover:bg-[#1a1a1a] hover:text-amber-50">
                    {activity.title}
                  </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center">
          <div
            onClick={handleDivClick}
            className="bg-[#1a1a1a] min-w-4/5 p-8 rounded-xl border border-gray-800 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <UploadCloud className="h-8 w-8 text-gray-300" />
            <p className="text-lg text-gray-300">Upload a file</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </main>
      </div>
    </>
  );
}
