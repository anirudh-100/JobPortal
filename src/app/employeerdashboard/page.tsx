"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Use session to check if user is authenticated
import { useRouter } from "next/navigation";

interface EmployerData {
  name: string;
  email: string;
  company: string;
  profilePicture: string | null;
  postedJobs: string[]; // List of job IDs or job titles the employer has posted
}

const EmployerDashboard = () => {
  const { data: session, status } = useSession(); // Get the session data
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "loading") return; // Wait until session is fully loaded
    if (!session) {
      router.push("/auth/signin"); // Redirect to login page if no session
    }
  }, [session, status, router]);

  // Fetch employer data from the API
  useEffect(() => {
    if (session) {
      const fetchEmployerData = async () => {
        try {
          const res = await fetch("/api/employer", { credentials: "include" });
          if (!res.ok) throw new Error("Failed to fetch employer details.");
          const data: EmployerData = await res.json();
          setEmployerData(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchEmployerData();
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employerData) {
    return <div>Loading employer data...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {employerData.name}!</h1>
      {employerData.profilePicture && (
        <img
          src={employerData.profilePicture}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mt-4"
        />
      )}
      <p className="mt-4">Email: {employerData.email}</p>
      <p>Company: {employerData.company}</p>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Posted Jobs</h2>
        <ul className="list-disc pl-6 mt-2">
          {employerData.postedJobs.length > 0 ? (
            employerData.postedJobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))
          ) : (
            <li>No jobs posted yet.</li>
          )}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Additional Features</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>View Job Seeker Applications</li>
          <li>Manage Posted Jobs</li>
          <li>Update Profile</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployerDashboard;
