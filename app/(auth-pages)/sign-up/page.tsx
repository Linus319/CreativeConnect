"use client"

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function Signup({ searchParams }: { searchParams: Message }) {
  const [userType, setUserType] = useState("");
  const [selectedSubTypes, setSelectedSubTypes] = useState<string[]>([]);
  const creativeSubTypes = ['Music', 'Video', 'Graphic design', 'Fashion', 'Animation', 'Photography'];
  const venueSubTypes = ['Event space', 'Art gallery', 'Performance venue', 'Recording studio', 'Photography studio', 'Rehearsal space'];

  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
    setSelectedSubTypes([]);
  };

  const handleSubTypeChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSubTypes((prev) => [...prev, value]);
    }
    else {
      setSelectedSubTypes((prev) => prev.filter((subType) => subType !== value));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("sub-type", JSON.stringify(selectedSubTypes));

    await signUpAction(formData);
  };


  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />

          <Label htmlFor="display-name">Display name</Label>
          <Input name="display-name" placeholder="Your public name" required />

          <Label htmlFor="user-type">User type</Label>
          <select
            name="user-type" 
            id="user-type" 
            value={userType}
            onChange={handleUserTypeChange}
            required
          >
            <option value="" disabled>Select user type</option>
            <option value="creative">Creative</option>
            <option value="venue">Venue</option>
          </select>

          <Label htmlFor="sub-type">Sub type</Label>
          <div>
            {userType === "creative" && creativeSubTypes.map((subType) => (
              <div key={subType}>
                <input 
                  type="checkbox" 
                  name={subType} 
                  id={subType} 
                  checked={selectedSubTypes.includes(subType)}
                  onChange={handleSubTypeChange} 
                  value={subType}
                />
                <label htmlFor={subType}>{subType}</label>
              </div>
            ))}
            {userType === "venue" && venueSubTypes.map((subType) => (
              <div key={subType}>
                <input 
                  type="checkbox" 
                  name={subType} 
                  id={subType}
                  checked={selectedSubTypes.includes(subType)}
                  onChange={handleSubTypeChange} 
                  value={subType}
                />
                <label htmlFor={subType}>{subType}</label>
              </div>
            ))}
          </div>

          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
