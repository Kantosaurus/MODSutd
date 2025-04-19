import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { useRouter } from 'next/navigation';

export default function LoginHero() {
  const [showLogin, setShowLogin] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const words = ["smarter", "faster", "easier", "better"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (studentId && password) {
      // TODO: Implement actual authentication logic here
      router.push('/');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-8">
        <motion.div
          animate={{ y: showLogin ? -50 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-5xl md:text-7xl font-bold text-black max-w-3xl">
            Plan your modules{" "}
            <span className="inline-flex min-w-[200px] h-[1.2em] items-center">
              <FlipWords words={words} className="text-blue-600" duration={1500} />
            </span>
            <br />
            with MODutd
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mt-6 max-w-2xl">
            Your Ultimate Module Planning Companion for SUTD Students
          </p>
          <button 
            onClick={() => setShowLogin(true)}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </motion.div>

        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 max-w-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 text-2xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 rounded-lg"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-2xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 rounded-lg"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-xl text-center">{error}</div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white text-2xl rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Sign In
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 