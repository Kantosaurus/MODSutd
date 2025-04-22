import { useState, useRef } from 'react';
import { SignupFormData, SignupFormErrors, SignupFormState } from '../types';

export const useSignupForm = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });

  const [formState, setFormState] = useState<SignupFormState>({
    showPassword: false,
    showConfirmPassword: false,
    currentStep: 1,
    showGreeting: false,
    isVerifying: false,
    showAnimation: false,
    animationCompleted: false,
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});

  const studentIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setFormState(prev => ({ ...prev, currentStep: 2 }));
      setTimeout(() => {
        studentIdRef.current?.focus();
      }, 500);
    }
  };

  const handleStudentIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let formattedId = formData.studentId.trim();
    
    // Add '100' prefix if not present and the remaining digits would make a valid ID
    if (!formattedId.startsWith('100') && formattedId.length === 4) {
      formattedId = '100' + formattedId;
      setFormData(prev => ({ ...prev, studentId: formattedId }));
    }
    
    if (formattedId.length < 7) {
      setErrors(prev => ({ ...prev, studentIdError: 'Student ID must be 7 digits' }));
      return;
    }
    
    if (formattedId.length > 7) {
      setErrors(prev => ({ ...prev, studentIdError: 'Student ID must be exactly 7 digits' }));
      return;
    }
    
    if (!formattedId.startsWith('100')) {
      setErrors(prev => ({ ...prev, studentIdError: 'Student ID must start with 100' }));
      return;
    }
    
    setErrors(prev => ({ ...prev, studentIdError: '' }));
    setFormState(prev => ({ ...prev, currentStep: 3 }));
    setTimeout(() => {
      passwordRef.current?.focus();
    }, 100);
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, studentId: value }));
      setErrors(prev => ({ ...prev, studentIdError: '' }));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.trim()) {
      if (formState.currentStep === 3) {
        setFormState(prev => ({ ...prev, currentStep: 4 }));
        setTimeout(() => {
          confirmPasswordRef.current?.focus();
        }, 100);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, passwordError: 'Passwords do not match' }));
        return;
      }

      setFormState(prev => ({ ...prev, isVerifying: true }));
      try {
        // First, register the user
        const signupResponse = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            studentId: formData.studentId,
            password: formData.password,
          }),
        });

        const signupData = await signupResponse.json();

        if (!signupResponse.ok) {
          throw new Error(signupData.error || 'Failed to register user');
        }

        // Then, send verification email
        const verificationResponse = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentId: formData.studentId }),
        });

        const verificationData = await verificationResponse.json();

        if (!verificationResponse.ok) {
          throw new Error(verificationData.details || verificationData.error || 'Failed to send verification email');
        }

        setFormState(prev => ({ ...prev, showAnimation: true }));
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          verificationError: error instanceof Error 
            ? error.message 
            : 'Failed to complete registration. Please try again.'
        }));
      } finally {
        setFormState(prev => ({ ...prev, isVerifying: false }));
      }
    }
  };

  const updateFormData = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'confirmPassword') {
      setErrors(prev => ({ ...prev, passwordError: '' }));
    }
  };

  const updateFormState = (field: keyof SignupFormState, value: boolean | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    formState,
    errors,
    studentIdRef,
    passwordRef,
    confirmPasswordRef,
    handleNameSubmit,
    handleStudentIdSubmit,
    handleStudentIdChange,
    handlePasswordSubmit,
    updateFormData,
    updateFormState,
  };
}; 