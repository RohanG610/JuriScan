// components/custom/LawyerProfileModal.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Lawyer {
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
  if (!lawyer) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-white rounded-xl p-6 shadow-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold mb-2">{lawyer.name}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Rate:</strong> {lawyer.rate}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {lawyer.location}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Specialization:</strong> {lawyer.specialization}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Availability:</strong> {lawyer.availability}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Languages:</strong> {lawyer.languages}
        </p>
        <p className="text-gray-600 italic mt-4">{lawyer.bio}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </Card>
    </div>
  );
}
