import { motion } from 'framer-motion';

interface GreetingProps {
  name: string;
  studentId: string;
}

export const Greeting = ({ name, studentId }: GreetingProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full space-y-8"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center w-[550px] mx-auto"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 space-y-2"
          >
            <div>Hello {name}!</div>
            <div className="whitespace-nowrap">We're pleased to have you onboard!</div>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-xl text-gray-600"
          >
            Just a few more steps before we're complete!
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-lg text-gray-600">
              We've sent a verification email to:
            </p>
            <p className="text-lg font-medium text-blue-600 mt-2">
              {studentId}@mymail.sutd.edu.sg
            </p>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-4 text-sm text-gray-500"
            >
              Please check your email and click the verification link to complete your registration.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 