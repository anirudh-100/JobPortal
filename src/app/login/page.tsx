"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      console.log('email', email);
      
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log('data->', data );

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Save the token in localStorage (or cookies for better security)
      localStorage.setItem("token", data.token);

      // Assuming the data contains a `role` property that specifies if the user is a "jobSeeker"
      if (data.role === "jobSeeker") {
        router.push("/dashboardjobseeker");  // Redirect to Job Seeker Dashboard
      } else if (data.role === "employer") {
        router.push("/employeerdashboard"); // Redirect to Employer Dashboard (if you have that too)
      } else {
        // Default route if the role is not recognized
        router.push("/dashboardjobseeker"); 
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <div className={styles.links}>
          <a href="/forgot-password" className={styles.link}>Forgot Password?</a>
          <a href="/signup" className={styles.link}>Create an Account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
