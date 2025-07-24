export default function ChatBubble({ role, content }: { role: "user" | "system"; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[60%] whitespace-pre-wrap p-3 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
