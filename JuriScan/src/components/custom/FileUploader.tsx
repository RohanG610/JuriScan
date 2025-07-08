import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function UploadFile({ onUpload }: { onUpload: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("/upload", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    onUpload(res.data); // session_id, summary, red_flags
  };

  return (
    <div className="p-4 space-y-2">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
