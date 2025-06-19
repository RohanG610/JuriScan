import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Lawyer {
  id: number;
  name: string;
  rate: string;
  location: string;
  specialization: string;
  availability: string;
  languages: string;
  bio: string;
}

interface Props {
  lawyer: Lawyer | null;
  onClose: () => void;
}

export default function LawyerProfileModal({ lawyer, onClose }: Props) {
  const [description, setDescription] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  if (!lawyer) return null;

  const handleHire = async () => {
    const res = await fetch("http://localhost:5000/hire-lawyer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail") || "guest@example.com",
        lawyerId: lawyer.id,
        description,
        contactMethod,
      }),
    });

    if (res.ok) {
      alert("Lawyer booked successfully!");
      onClose();
    } else {
      alert("Failed to book lawyer.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-white rounded-xl p-6 shadow-2xl relative">
        <button className="absolute top-4 right-4" onClick={onClose}>✕</button>
        <h2 className="text-3xl font-bold mb-2">{lawyer.name}</h2>
        <p><strong>Specialization:</strong> {lawyer.specialization}</p>
        <p><strong>Languages:</strong> {lawyer.languages}</p>

        <div className="mt-4">
          <Textarea
            placeholder="Why are you hiring this lawyer?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="mt-2 border p-2 rounded w-full"
          placeholder="Preferred contact (email or phone)"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleHire}>Book Lawyer</Button>
        </div>
      </Card>
    </div>
  );
}
