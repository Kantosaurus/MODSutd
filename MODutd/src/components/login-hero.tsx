import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { useRouter } from 'next/navigation';
import { authenticateUser } from "@/lib/auth";

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

    if (!studentId || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const user = await authenticateUser(studentId, password);
      
      if (user) {
        router.push('/dashboard');
      } else {
        setError('Invalid student ID or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-8">
        <motion.div
          animate={{ y: showLogin ? -50 : 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.7
          }}
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
          <motion.button 
            onClick={() => setShowLogin(true)}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.7
              }}
              className="mt-8 max-w-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 text-2xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 rounded-lg transition-all duration-300 hover:shadow-md"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-2xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 rounded-lg transition-all duration-300 hover:shadow-md"
                  />
                </motion.div>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xl text-center"
                  >
                    {error}
                  </motion.div>
                )}
                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white text-2xl rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 