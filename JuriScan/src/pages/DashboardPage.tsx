import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import ChatInputBar from "@/components/custom/ChatInputBar";
import ChatBubble from "@/components/custom/ChatBubble";
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
  const [sessionData, setSessionData] = useState<{
    sessionId: string,
    messages: {role:"user"|"system";content:string}[];
  }>({
    sessionId: "",
    messages:[],
  })
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
        
        setSessionData({
          sessionId: data.session_id,
          messages: [
            {role: "system", content: `${data.summary}`},
            {role: "system", content: `${data.red_flags}`}
          ]
        });
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong.");
    }
  };

  const handleSendMessage = async (message: string) => {
    setSessionData(prev => ({
      ...prev,
      messages: [...prev.messages, { role: "user", content: message }],
    }));
  
    try {
      const token = localStorage.getItem("token");
    
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          session_id: sessionData.sessionId,
          message: message,
        }),
      });
    
      const data = await res.json();
    
      setSessionData(prev => ({
        ...prev,
        messages: [...prev.messages, { role: "user", content: message }, { role: "system", content: data.response }],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-3.75rem)] bg-[#0F1117] text-[#E5E7EB]">
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
          {sessionData.sessionId === "" ? (
            //Upload a File
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
          ) : (
            <div className="flex flex-col items-center justify-between w-full h-screen">
              <div className="flex-2 overflow-y-auto flex flex-col items-center px-4 pt-6 space-y-4">
                {sessionData.messages.map((msg, i) => (
                  <ChatBubble key={i} role={msg.role} content={msg.content} />
                ))}
              </div>
              <ChatInputBar onSend={handleSendMessage} />
            </div>

          )}
        </main>
      </div>
    </>
  );
}
