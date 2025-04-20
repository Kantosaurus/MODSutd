import { motion } from 'framer-motion';
import { SignupFormData, SignupFormErrors } from '../types';

interface StudentIdInputProps {
  formData: SignupFormData;
  errors: SignupFormErrors;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onStudentIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const StudentIdInput = ({
  formData,
  errors,
  inputRef,
  onStudentIdChange,
  onSubmit,
}: StudentIdInputProps) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
      onSubmit={onSubmit}
    >
      <h2 className="text-5xl font-extrabold text-gray-900">
        My student ID is
      </h2>
      <div className="flex-1">
        <label htmlFor="studentId" className="sr-only">
          Student ID
        </label>
        <input
          id="studentId"
          name="studentId"
          type="text"
          required
          ref={inputRef}
          className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10"
          placeholder="100XXXX"
          value={formData.studentId}
          onChange={onStudentIdChange}
        />
        {errors.studentIdError && (
          <p className="mt-2 text-sm text-red-600">{errors.studentIdError}</p>
        )}
      </div>
    </motion.form>
  );
}; 