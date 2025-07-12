import type { FC } from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // <-- new prop
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<"citizen" | "lawyer" | "">("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const handleFormSubmit = async () => {
    const endpoint = isSignup ? "/auth/register" : "/auth/login";

    const payload: any = { email, password };
    if (isSignup) payload.role = role;
    if (isSignup) payload.name = name;

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        alert("Authenticated ✅");
        onClose();
      } else {
        alert(data.message || "Authentication failed.");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {isSignup ? "Sign Up" : "Login"}
          </DialogTitle>
        </DialogHeader>

        {isSignup && (
          <div className="space-y-2">
            <Label htmlFor="nanme">Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="Toph Beifong"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isSignup && (
            <div className="space-y-2">
              <Label>Select Role</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={role === "citizen" ? "default" : "outline"}
                  onClick={() => setRole("citizen")}
                  className="w-[45%]"
                >
                  Citizen
                </Button>
                <Button
                  type="button"
                  variant={role === "lawyer" ? "default" : "outline"}
                  onClick={() => setRole("lawyer")}
                  className="w-[45%]"
                >
                  Lawyer
                </Button>
              </div>
            </div>
          )}

          <Button className="w-full" onClick={handleFormSubmit}>
            {isSignup ? "Create Account" : "Login"}
          </Button>

          <Separator className="my-4" />

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-600 hover:underline ml-1"
              onClick={() => {
                setIsSignup(!isSignup);
                setRole(""); // clear role if switching
              }}
            >
              {isSignup ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
