import { useState } from "react";
import { Button } from "../ui/button";

export default function ChatInputBar({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="sticky bottom-15 w-[75%] flex justify-center bg-[#1A1C22] border-t rounded-2xl border-[#2C2F36] px-4 py-3">
      <div className=" w-[100%] flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-[0.75rem] bg-[#0F1117] text-white outline-none"
          placeholder="Ask about this document..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}

