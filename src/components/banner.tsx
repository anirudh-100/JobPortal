// components/Banner.tsx
import React from "react";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">
          Explore Your Career Path with Student Portal
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover internships, jobs, and skill-building opportunities tailored for students. Kickstart your career journey today!
        </p>

        {/* Call to Action Button */}
        <div>
          <a
            href="#jobs"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white text-xl py-3 px-8 rounded-lg shadow-lg transition duration-300"
          >
            Browse Latest Jobs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
