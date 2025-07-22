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

    const token = localStorage.getItem("token")

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Session ID:", data.session_id);
        console.log("Summary:", data.summary);
        console.log("Red Flags:", data.red_flags);
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
      <div className="flex min-h-screen bg-[#0F1117] text-[#E5E7EB]">
        {/* Sidebar */}
        <aside className="w-72 p-4 bg-[#1A1C22] border-r border-[#2C2F36] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="justify-start text-left text-[#E5E7EB] font-medium hover:bg-[#1F232C] hover:text-[#4F46E5]"
            >
              New Chat
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-left text-[#E5E7EB] font-medium hover:bg-[#1F232C] hover:text-[#4F46E5]"
            >
              Recent Files
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-left text-[#E5E7EB] font-medium hover:bg-[#1F232C] hover:text-[#4F46E5]"
            >
              Settings
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-[#E5E7EB]">Recent Activity</h2>
            <div className="flex flex-col gap-1">
              {mockActivities.map((activity, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start text-left text-[#9CA3AF] font-normal hover:bg-[#1F232C] hover:text-[#4F46E5]"
                >
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
            className="bg-[#1A1C22] w-[90%] max-w-xl p-8 rounded-xl border border-[#2C2F36] flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <UploadCloud className="h-8 w-8 text-[#9CA3AF]" />
            <p className="text-lg text-[#9CA3AF]">Upload a file</p>
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
