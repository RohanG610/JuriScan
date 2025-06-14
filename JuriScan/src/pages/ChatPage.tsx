import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Navbar from "@/components/custom/navbar";

export default function ChatPage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);
      setHighlights(res.data.highlights || []);
    } catch (err) {
      console.error("Error uploading file", err);
      setSummary("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-zinc-900 text-white p-4 space-y-4 overflow-y-auto">
        <h2 className="text-lg font-bold">Recent Documents</h2>
        <ul className="space-y-1 text-sm">
          <p className="text-zinc-400">No recent files</p>
        </ul>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-zinc-950 text-black dark:text-white">
        <div className="max-w-3xl mx-auto flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-center">Upload Legal Documents</h1>
          <div className="relative w-full">
          <Input
            className="border-3 border-sky-400 p-rounded-md bg-white text-black dark-text-black"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          </div>
          <Button onClick={handleUpload} disabled={loading||!file}>
            {loading?"Summarizing...":"Upload & Summarize"}
          </Button>
          { summary && (
            <div className="mt-4 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{summary}</p>
            </div>
          )}

          {highlights.length>0 && (
            <div className="mt-4 bg-slate-100 dark:bg-zinc-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-">Highlighted Clause</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
                {highlights.map((item, i)=>(
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
    </>
  );
}
