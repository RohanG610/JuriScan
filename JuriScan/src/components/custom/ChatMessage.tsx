export default function ChatMessage({ sender, message }: { sender: string; message: string }) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`p-3 max-w-xs rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
        {message}
      </div>
    </div>
  );
}
