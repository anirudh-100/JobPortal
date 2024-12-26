"use client";

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importing Image from Next.js

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // For profile picture preview
  const [isLoading, setIsLoading] = useState(false); // Loading state to show on submit
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        setIsError(true);
        setMessage("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setIsError(true);
        setMessage("File size must be less than 5MB.");
        return;
      }

      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file)); // Set image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  // Set loading to true while submitting

    if (formData.password !== formData.confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("password", formData.password);

    if (formData.profilePicture) {
      formPayload.append("profilePicture", formData.profilePicture);
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setIsError(false);
      setMessage("Sign up successful!");
      
      // Redirect to the Employer Dashboard after successful sign-up
      router.push("/dashboardjobseeker"); // Navigate to the employer dashboard

    } catch {
      setIsError(true);
      setMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);  // Set loading to false after submission is complete
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.signupBox} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Create Your Account</h1>

        {message && (
          <div
            style={{
              ...styles.signupMessage,
              color: isError ? "red" : "green",
            }}
          >
            {message}
          </div>
        )}

        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <FaEnvelope style={styles.icon} />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <FaPhone style={styles.icon} />
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            style={styles.input}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <FaImage style={styles.icon} />
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            style={styles.input}
            accept="image/*"
            onChange={handleInputChange}
          />
          {preview && (
            <div style={styles.previewContainer}>
              <Image
                src={preview}
                alt="Profile Preview"
                style={styles.imagePreview}
                width={100} // Set width
                height={100} // Set height
              />
            </div>
          )}
        </div>

        <button type="submit" style={styles.signupButton} disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0a, #1e3a8a)",
    padding: "1rem",
  },
  signupBox: {
    background: "rgba(28, 28, 30, 0.95)",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "1.8rem",
  },
  signupMessage: {
    marginBottom: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.2rem",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    paddingLeft: "2.5rem",
    border: "none",
    borderRadius: "5px",
    background: "#2c2c2e",
    color: "#ffffff",
    outline: "none",
    fontSize: "1rem",
  },
  icon: {
    position: "absolute",
    left: "10px",
    color: "#ffffff",
  },
  signupButton: {
    width: "100%",
    padding: "0.8rem",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  previewContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    background: "#2c2c2e",
    padding: "0.5rem",
    borderRadius: "5px",
  },
  imagePreview: {
    maxWidth: "100px",
    borderRadius: "8px",
    marginTop: "10px",
  },
};

export default SignUp;
