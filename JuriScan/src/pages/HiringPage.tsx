import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FilterSelect from "@/components/custom/filterSelect";
import LawyerProfileModal from "@/components/custom/laywersProfileModal";
import Navbar from "@/components/custom/navbar";

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

export default function LawyerHiringPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filters, setFilters] = useState({
    rate: "",
    location: "",
    specialization: "",
    availability: "",
    language: "",
  });

  const clearFilters = () =>
    setFilters({
      rate: "",
      location: "",
      specialization: "",
      availability: "",
      language: "",
    });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredLawyers = lawyers.filter((lawyer) => {
    return (
      (!filters.rate || lawyer.rate.includes(filters.rate)) &&
      (!filters.location || lawyer.location.toLowerCase().includes(filters.location)) &&
      (!filters.specialization || lawyer.specialization.toLowerCase().includes(filters.specialization)) &&
      (!filters.availability || lawyer.availability.toLowerCase().includes(filters.availability)) &&
      (!filters.language || lawyer.languages.toLowerCase().includes(filters.language))
    );
  });

  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/lawyers")
      .then((res) => res.json())
      .then((data) => setLawyers(data))
      .catch((err) => console.error("Failed to fetch lawyers", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-[#0F1117] text-[#E5E7EB] p-6">
        {/* Filters Sidebar */}
        <aside className="sticky top-6 h-fit w-1/3 max-w-xs flex flex-col gap-4 p-4 bg-[#1A1C22] shadow-md rounded-xl border border-[#2C2F36]">
          <h2 className="text-xl font-semibold mb-2">Filter Lawyers</h2>

          <div className="w-full space-y-4">
            <FilterSelect
              label="Service Rate"
              placeholder="Select Rate"
              value={filters.rate}
              onChange={(value) => handleFilterChange("rate", value)}
              options={[
                { value: "100", label: "Up to $100/hr" },
                { value: "150", label: "Up to $150/hr" },
                { value: "200", label: "Up to $200/hr" },
              ]}
            />

            <FilterSelect
              label="Location"
              placeholder="Select Location"
              value={filters.location}
              onChange={(value) => handleFilterChange("location", value)}
              options={[
                { value: "new york", label: "New York" },
                { value: "los angeles", label: "Los Angeles" },
              ]}
            />

            <FilterSelect
              label="Specialization"
              placeholder="Select Area of Law"
              value={filters.specialization}
              onChange={(value) => handleFilterChange("specialization", value)}
              options={[
                { value: "corporate", label: "Corporate Law" },
                { value: "family", label: "Family Law" },
              ]}
            />

            <FilterSelect
              label="Availability"
              placeholder="Select Availability"
              value={filters.availability}
              onChange={(value) => handleFilterChange("availability", value)}
              options={[
                { value: "weekdays", label: "Weekdays" },
                { value: "weekends", label: "Weekends" },
              ]}
            />

            <FilterSelect
              label="Languages"
              placeholder="Select Language"
              value={filters.language}
              onChange={(value) => handleFilterChange("language", value)}
              options={[
                { value: "english", label: "English" },
                { value: "spanish", label: "Spanish" },
                { value: "french", label: "French" },
              ]}
            />

            <Button
              variant="secondary"
              onClick={clearFilters}
              className="w-full mt-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white"
            >
              Clear Filters
            </Button>
          </div>
        </aside>

        {/* Lawyer List */}
        <section className="flex-1 pl-8 space-y-6">
          {filteredLawyers.length === 0 ? (
            <p className="text-[#9CA3AF]">No lawyers match the selected filters.</p>
          ) : (
            filteredLawyers.map((lawyer, idx) => {
              const initials = lawyer.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <Card
                  key={idx}
                  className="w-full bg-[#1A1C22] border border-[#2C2F36] shadow-md p-4 flex items-start gap-4 rounded-xl transition hover:shadow-lg"
                >
                  <div className="bg-[#4F46E5] text-white font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
                    {initials}
                  </div>
                  <CardContent className="p-0 space-y-2">
                    <h3 className="text-2xl font-semibold text-[#E5E7EB]">{lawyer.name}</h3>
                    <p className="text-[#9CA3AF]">
                      <strong className="text-[#E5E7EB]">Rate:</strong> {lawyer.rate}
                    </p>
                    <p className="text-[#9CA3AF]">
                      <strong className="text-[#E5E7EB]">Location:</strong> {lawyer.location}
                    </p>
                    <p className="text-[#9CA3AF]">
                      <strong className="text-[#E5E7EB]">Specialization:</strong> {lawyer.specialization}
                    </p>
                    <p className="text-[#9CA3AF]">
                      <strong className="text-[#E5E7EB]">Availability:</strong> {lawyer.availability}
                    </p>
                    <p className="text-[#9CA3AF]">
                      <strong className="text-[#E5E7EB]">Languages:</strong> {lawyer.languages}
                    </p>
                    <p className="italic text-[#9CA3AF]">{lawyer.bio}</p>
                    <Button
                      className="mt-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white"
                      onClick={() => setSelectedLawyer(lawyer)}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}

          <LawyerProfileModal
            lawyer={selectedLawyer}
            onClose={() => setSelectedLawyer(null)}
          />
        </section>
      </div>
    </>
  );
}
