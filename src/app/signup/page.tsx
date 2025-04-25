'use client'

import React from 'react';
import { useSignupForm } from './hooks/useSignupForm';
import { NameInput } from './components/NameInput';
import { StudentIdInput } from './components/StudentIdInput';
import { PasswordInput } from './components/PasswordInput';
import { SuccessAnimation } from './components/SuccessAnimation';
import { Greeting } from './components/Greeting';

export default function SignupPage() {
  const {
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
  } = useSignupForm();

  if (formState.showAnimation) {
    return (
      <SuccessAnimation
        onComplete={() => {
          setTimeout(() => {
            updateFormState('showAnimation', false);
            updateFormState('showGreeting', true);
          }, 500);
        }}
      />
    );
  }

  if (formState.showGreeting) {
    return <Greeting name={formData.name} studentId={formData.studentId} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="space-y-2">
          <NameInput
            formData={formData}
            onNameChange={(value) => updateFormData('name', value)}
            onSubmit={handleNameSubmit}
          />

          {formState.currentStep >= 2 && (
            <StudentIdInput
              formData={formData}
              errors={errors}
              inputRef={studentIdRef}
              onStudentIdChange={handleStudentIdChange}
              onSubmit={handleStudentIdSubmit}
            />
          )}

          {formState.currentStep >= 3 && (
            <PasswordInput
              formData={formData}
              formState={formState}
              errors={errors}
              passwordRef={passwordRef}
              confirmPasswordRef={confirmPasswordRef}
              onPasswordChange={(value) => updateFormData('password', value)}
              onConfirmPasswordChange={(value) => updateFormData('confirmPassword', value)}
              onTogglePasswordVisibility={() => updateFormState('showPassword', !formState.showPassword)}
              onToggleConfirmPasswordVisibility={() => updateFormState('showConfirmPassword', !formState.showConfirmPassword)}
              onSubmit={handlePasswordSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
} 