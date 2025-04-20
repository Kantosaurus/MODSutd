import { motion } from 'framer-motion';
import { SignupFormData } from '../types';

interface NameInputProps {
  formData: SignupFormData;
  onNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const NameInput = ({ formData, onNameChange, onSubmit }: NameInputProps) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
      onSubmit={onSubmit}
    >
      <h2 className="text-5xl font-extrabold text-gray-900">
        Hello! My name is
      </h2>
      <div className="flex-1">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
    </motion.form>
  );
}; 