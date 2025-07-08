import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatMessage from "@/components/custom/ChatMessage";
import UploadFile from "@/components/custom/FileUploader";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/navbar";

export default function ChatRoom() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [redFlags, setRedFlags] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  const handleUpload = (data: any) => {
    setSessionId(data.session_id);
    setSummary(data.summary);
    setRedFlags(data.red_flags);
    setMessages([{ sender: "assistant", message: "File uploaded. You can now ask questions." }]);
    console.log("what's app");
  };

  const handleSend = async () => {
    if (!input || !sessionId) return;
    setMessages((prev) => [...prev, { sender: "user", message: input }]);
    setInput("");

    const res = await axios.post("/chat/ask", { message: input, session_id: sessionId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    setMessages((prev) => [...prev, { sender: "assistant", message: res.data.answer }]);
  };

  return (
    <>
    <Navbar />
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      {!sessionId && <UploadFile onUpload={handleUpload} />}
      {summary && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-1">Summary</h2>
          <p>{summary}</p>
          <h2 className="font-bold text-lg mt-4 mb-1">Red Flags</h2>
          <p>{redFlags}</p>
        </div>
      )}
      <div className="h-[300px] overflow-y-auto bg-white p-4 rounded shadow border">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} message={msg.message} />
        ))}
        <div ref={chatEndRef} />
      </div>
      {sessionId && (
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      )}
    </div>
    </>
  );
}
