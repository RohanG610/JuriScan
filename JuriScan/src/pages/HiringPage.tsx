import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/custom/navbar";

const lawyers = [
  {
    name: "John Doe",
    rate: "$150/hr",
    location: "New York, NY",
    specialization: "Corporate Law",
    availability: "Weekdays",
    languages: "English, Spanish",
    bio: "Experienced corporate lawyer with 10+ years in the industry helping startups and Fortune 500 companies.",
  },
  {
    name: "Jane Smith",
    rate: "$120/hr",
    location: "Los Angeles, CA",
    specialization: "Family Law",
    availability: "Weekends",
    languages: "English, French",
    bio: "Passionate about supporting families through legal matters with empathy and dedication.",
  },
];

export default function LawyerHiringPage() {
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
      (!filters.specialization ||
        lawyer.specialization.toLowerCase().includes(filters.specialization)) &&
      (!filters.availability ||
        lawyer.availability.toLowerCase().includes(filters.availability)) &&
      (!filters.language || lawyer.languages.toLowerCase().includes(filters.language))
    );
  });

  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen bg-slate-50 p-6">
      {/* Filters Sidebar */}
      <aside className="sticky top-6 h-fit w-1/3 max-w-xs flex flex-col items-center justify-center gap-4 p-4 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Filter Lawyers</h2>

        <div className="w-full space-y-4">
          <div>
            <Label>Service Rate</Label>
            <Select onValueChange={(value) => handleFilterChange("rate", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">Up to $100/hr</SelectItem>
                <SelectItem value="150">Up to $150/hr</SelectItem>
                <SelectItem value="200">Up to $200/hr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Location</Label>
            <Select onValueChange={(value) => handleFilterChange("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="los angeles">Los Angeles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Specialization</Label>
            <Select onValueChange={(value) => handleFilterChange("specialization", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Area of Law" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate">Corporate Law</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Availability</Label>
            <Select onValueChange={(value) => handleFilterChange("availability", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Languages</Label>
            <Select onValueChange={(value) => handleFilterChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="secondary" onClick={clearFilters} className="w-full mt-2">
            Clear Filters
          </Button>
        </div>
      </aside>

      {/* Lawyer List */}
      <section className="flex-1 pl-8 space-y-6">
        {filteredLawyers.map((lawyer, idx) => {
          const initials = lawyer.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <Card key={idx} className="w-full shadow-sm flex items-start gap-4 p-4">
              <div className="bg-blue-100 text-blue-800 font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl">
                {initials}
              </div>
              <CardContent className="p-0 space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900">{lawyer.name}</h3>
                <p className="text-gray-700">
                  <strong>Rate:</strong> {lawyer.rate}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {lawyer.location}
                </p>
                <p className="text-gray-700">
                  <strong>Specialization:</strong> {lawyer.specialization}
                </p>
                <p className="text-gray-700">
                  <strong>Availability:</strong> {lawyer.availability}
                </p>
                <p className="text-gray-700">
                  <strong>Languages:</strong> {lawyer.languages}
                </p>
                <p className="text-gray-600 italic">{lawyer.bio}</p>
                <Button className="mt-2">View Profile</Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
    </>
  );
}
