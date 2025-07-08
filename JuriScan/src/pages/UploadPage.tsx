import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [redFlags, setRedFlags] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSummary(res.data.summary);
      setRedFlags(res.data.red_flags);
      setSessionId(res.data.session_id);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = () => {
    if (sessionId) {
      navigate(`/chat/${sessionId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-10">
        <h1 className="text-3xl font-bold mb-4">Upload Legal Document</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <Button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload & Analyze"}
        </Button>

        {summary && redFlags && (
          <div className="mt-8 w-full max-w-3xl space-y-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">📄 Summary</h2>
                <p className="text-gray-700">{summary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-red-600">⚠️ Red Flags</h2>
                <p className="text-gray-700">{redFlags}</p>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button onClick={handleStartChat}>Start Chat</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
