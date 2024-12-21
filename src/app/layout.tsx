// app/layout.tsx
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Student Portal",
  description: "Your gateway to jobs, internships, and career guidance.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-12">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
