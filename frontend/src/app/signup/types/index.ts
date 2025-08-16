export interface SignupFormData {
  name: string;
  studentId: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormErrors {
  studentIdError?: string;
  passwordError?: string;
  verificationError?: string;
}

export interface SignupFormState {
  showPassword: boolean;
  showConfirmPassword: boolean;
  currentStep: number;
  showGreeting: boolean;
  isVerifying: boolean;
  showAnimation: boolean;
  animationCompleted: boolean;
} 