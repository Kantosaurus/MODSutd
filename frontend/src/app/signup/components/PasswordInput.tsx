import { motion } from 'framer-motion';
import { SignupFormData, SignupFormErrors, SignupFormState } from '../types';

interface PasswordInputProps {
  formData: SignupFormData;
  formState: SignupFormState;
  errors: SignupFormErrors;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  confirmPasswordRef: React.RefObject<HTMLInputElement | null>;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PasswordInput = ({
  formData,
  formState,
  errors,
  passwordRef,
  confirmPasswordRef,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onSubmit,
}: PasswordInputProps) => {
  return (
    <div className="space-y-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.password.trim()) {
            onSubmit(e);
          }
        }}
      >
        <h2 className="text-5xl font-extrabold text-gray-900 whitespace-nowrap">
          My password is
        </h2>
        <div className="flex-1 relative min-w-[500px]">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              name="password"
              type={formState.showPassword ? "text" : "password"}
              required
              ref={passwordRef}
              className="appearance-none block w-full px-3 py-2 pr-16 text-5xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 p-1 text-gray-500 hover:text-gray-700 z-10"
              onClick={onTogglePasswordVisibility}
              aria-label={formState.showPassword ? "Hide password" : "Show password"}
            >
              {formState.showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.form>

      {formState.currentStep >= 4 && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
        >
          <h2 className="text-5xl font-extrabold text-gray-900">
            Let's confirm again just to be sure:
          </h2>
          <div className="w-full relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={formState.showConfirmPassword ? "text" : "password"}
                required
                ref={confirmPasswordRef}
                className="appearance-none block w-full px-3 py-2 pr-16 text-5xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-blue-500"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 p-1 text-gray-500 hover:text-gray-700 z-10"
                onClick={onToggleConfirmPasswordVisibility}
                aria-label={formState.showConfirmPassword ? "Hide password" : "Show password"}
              >
                {formState.showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {errors.passwordError && (
            <p className="text-sm text-red-600">{errors.passwordError}</p>
          )}
          {errors.verificationError && (
            <p className="text-sm text-red-600">{errors.verificationError}</p>
          )}
        </motion.form>
      )}
    </div>
  );
}; 