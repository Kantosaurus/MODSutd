import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import successAnimation from '../Animation - 1745165256271.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface SuccessAnimationProps {
  onComplete: () => void;
}

export const SuccessAnimation = ({ onComplete }: SuccessAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="w-64 h-64">
        <Lottie
          animationData={successAnimation}
          loop={false}
          autoplay
          onComplete={onComplete}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  );
}; 