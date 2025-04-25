import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export default function FlipWordsDemo() {
  const words = ["smarter", "faster", "easier", "better"];

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-8">
        <div className="text-5xl md:text-7xl font-bold text-black max-w-3xl">
          Plan your modules{" "}
          <span className="inline-flex min-w-[200px] h-[1.2em] items-center">
            <FlipWords words={words} className="text-blue-600" />
          </span>
          <br />
          with MODutd
        </div>
        <p className="text-xl md:text-2xl text-gray-600 mt-6 max-w-2xl">
          Your Ultimate Module Planning Companion for SUTD Students
        </p>
        <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
          Start Planning Now
        </button>
      </div>
    </div>
  );
} 