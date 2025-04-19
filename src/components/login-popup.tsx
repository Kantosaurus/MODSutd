import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPopup: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-sm"
          >
            {/* Login Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            
            <div className="relative p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Welcome Back
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Sign in to your MODutd account
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    id="student-id"
                    name="studentId"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 text-sm bg-white/40 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500/70"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-2.5 text-sm bg-white/40 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 placeholder:text-gray-500/70"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
                >
                  Sign In
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup; 