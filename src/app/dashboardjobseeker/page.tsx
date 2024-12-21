"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Use session to check if user is authenticated
import { useRouter } from "next/navigation";

interface JobSeekerData {
  name: string;
  email: string;
  profilePicture: string | null;
  appliedJobs: string[]; // List of job IDs or job titles the job seeker has applied to
}

interface JobRecommendation {
  title: string;
  company: string;
  skillsRequired: string;
}

const JobSeekerDashboard = () => {
  const { data: session, status } = useSession();
  const [jobSeekerData, setJobSeekerData] = useState<JobSeekerData | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<JobRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
console.log("status", status);
console.log("session", session);

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  // Fetch job seeker data
  useEffect(() => {
    if (session) {
      const fetchJobSeekerData = async () => {
        try {
          const res = await fetch("/api/job-seeker", { credentials: "include" });
          if (!res.ok) throw new Error("Failed to fetch job seeker details.");
          const data: JobSeekerData = await res.json();
          setJobSeekerData(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchJobSeekerData();
    }
  }, [session]);

  // Fetch job recommendations
  useEffect(() => {
    if (session) {
      const fetchJobRecommendations = async () => {
        try {
          const res = await fetch("/api/job-recommendations");
          if (!res.ok) throw new Error("Failed to fetch job recommendations.");
          const data: JobRecommendation[] = await res.json();
          setRecommendedJobs(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchJobRecommendations();
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobSeekerData) {
    return <div>Loading job seeker data...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {jobSeekerData.name}!</h1>
      {jobSeekerData.profilePicture && (
        <img
          src={jobSeekerData.profilePicture}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mt-4"
        />
      )}
      <p className="mt-4">Email: {jobSeekerData.email}</p>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Applied Jobs</h2>
        <ul className="list-disc pl-6 mt-2">
          {jobSeekerData.appliedJobs.length > 0 ? (
            jobSeekerData.appliedJobs.map((job, index) => (
              <li key={index}>{job}</li>
            ))
          ) : (
            <li>No jobs applied yet.</li>
          )}
        </ul>
      </div>

      {/* AI-Powered Job Recommendations */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Recommended Jobs for You</h2>
        <ul className="list-disc pl-6 mt-2">
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job, index) => (
              <li key={index}>
                <strong>{job.title}</strong> at {job.company} <br />
                <em>Skills Required: {job.skillsRequired}</em>
              </li>
            ))
          ) : (
            <li>No recommendations available.</li>
          )}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Additional Features</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>Update Profile</li>
          <li>Browse Jobs</li>
          <li>View Job Offers</li>
        </ul>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
