'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import StepFive from './steps/StepFive';
import StepSix from './steps/StepSix';
import StepSeven from './steps/StepSeven';
import StepEight from './steps/StepEight';
import StepNine from './steps/StepNine';
import StepTen from './steps/StepTen';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedGroup: null,
    payment: null,
    gender: '',
    height: '',
    weight: '',
    age: '',
    activityLevel: null,
    goal: null,
    trackingDay: null
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {currentStep === 1 && (
          <StepOne 
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 3 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 4 && (
          <StepFour
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 5 && (
          <StepFive
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 6 && (
          <StepSix
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 7 && (
          <StepSeven
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 8 && (
          <StepEight
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 9 && (
          <StepNine
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}
        {currentStep === 10 && (
          <StepTen
            formData={formData}
            setFormData={setFormData}
            onNext={handleSubmit}
            onBack={handlePreviousStep}
          />
        )}
      </div>
    </main>
  );
}