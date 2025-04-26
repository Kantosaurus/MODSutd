'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IconChevronDown, IconChevronRight, IconPlus, IconMinus } from '@tabler/icons-react';

const PILLARS = [
  'Architecture and Sustainable Design',
  'Computer Science and Design',
  'Design and Artificial Intelligence',
  'Engineering Systems Design',
  'Engineering Product Development'
] as const;

type Pillar = typeof PILLARS[number];

const PILLAR_ABBREVIATIONS: Record<Pillar, string> = {
  'Architecture and Sustainable Design': 'ASD',
  'Computer Science and Design': 'CSD',
  'Design and Artificial Intelligence': 'DAI',
  'Engineering Systems Design': 'ESD',
  'Engineering Product Development': 'EPD'
};

const TRACKS: Record<Pillar, string[]> = {
  'Architecture and Sustainable Design': [
    'Sustainable Built Environment',
    'Digital Design and Construction',
    'Integrated Building Design'
  ],
  'Computer Science and Design': [
    'Full Stack Development',
    'Software Engineering',
    'Cloud Computing',
    'Cybersecurity'
  ],
  'Design and Artificial Intelligence': [
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Robotics and AI'
  ],
  'Engineering Systems Design': [
    'Systems Engineering',
    'Operations Research',
    'Supply Chain Management',
    'Data Analytics'
  ],
  'Engineering Product Development': [
    'Product Design',
    'Manufacturing Engineering',
    'Mechanical Systems',
    'Electronics and IoT'
  ]
};

const MINOR_OPTIONS = [
  'Business',
  'Computer Science',
  'Data Science',
  'Design',
  'Engineering',
  'Mathematics',
  'Physics',
  'Psychology'
];

const HASS_MINOR = 'HASS';

type Step = 'name' | 'pillar' | 'track' | 'minors';

export default function NewPlanPage() {
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [planName, setPlanName] = useState('');
  const [pillar, setPillar] = useState<Pillar | ''>('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [numMinors, setNumMinors] = useState(0);
  const [selectedMinors, setSelectedMinors] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayText = pillar ? (isHovering ? pillar : PILLAR_ABBREVIATIONS[pillar]) : 'Select a pillar';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNext = () => {
    switch (currentStep) {
      case 'name':
        if (planName.trim()) setCurrentStep('pillar');
        break;
      case 'pillar':
        if (pillar) setCurrentStep('track');
        break;
      case 'track':
        if (selectedTrack) setCurrentStep('minors');
        break;
      case 'minors':
        // TODO: Handle plan creation with all selected options
        console.log('Creating plan:', { planName, pillar, selectedTrack, numMinors, selectedMinors });
        router.push('/dashboard');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'pillar':
        setCurrentStep('name');
        break;
      case 'track':
        setCurrentStep('pillar');
        break;
      case 'minors':
        setCurrentStep('track');
        break;
    }
  };

  const handleTrackSelect = (track: string) => {
    setSelectedTrack(track);
    setCurrentStep('minors');
  };

  const handleMinorSelect = (minor: string) => {
    if (selectedMinors.includes(minor)) {
      setSelectedMinors(selectedMinors.filter(m => m !== minor));
      setNumMinors(prev => prev - 1);
    } else if (numMinors < 2) {
      if (minor === HASS_MINOR) {
        setSelectedMinors([HASS_MINOR, ...selectedMinors]);
      } else {
        setSelectedMinors([...selectedMinors, minor]);
      }
      setNumMinors(prev => prev + 1);
    }
  };

  const isMinorDisabled = (minor: string) => {
    if (selectedMinors.includes(minor)) return false;
    if (numMinors >= 2) return true;
    
    if (selectedMinors.includes(HASS_MINOR)) return false;
    
    if (numMinors === 1 && !selectedMinors.includes(HASS_MINOR)) {
      return minor !== HASS_MINOR;
    }
    
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create New Plan</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Step {['name', 'pillar', 'track', 'minors'].indexOf(currentStep) + 1} of 4</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${((['name', 'pillar', 'track', 'minors'].indexOf(currentStep) + 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <motion.form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (planName.trim()) {
                  handleNext();
                }
              }}
            >
              <h2 className="text-5xl font-extrabold text-gray-900">
                My plan is called
              </h2>
              <div className="flex-1">
                <label htmlFor="planName" className="sr-only">
                  Plan Name
                </label>
                <input
                  id="planName"
                  name="planName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10"
                  placeholder="Enter plan name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </div>
            </motion.form>
          </motion.div>

          {currentStep !== 'name' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <motion.form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pillar) {
                    handleNext();
                  }
                }}
              >
                <h2 className="text-5xl font-extrabold text-gray-900">
                  This plan is for
                </h2>
                <div className="flex-1 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="appearance-none relative block w-full px-3 py-2 text-5xl text-gray-900 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:z-10 flex items-center justify-between"
                  >
                    <span className={`${pillar ? 'text-gray-900' : 'text-gray-400'}`}>
                      {displayText}
                    </span>
                    <IconChevronDown className="h-8 w-8 text-gray-400" />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100"
                      >
                        {PILLARS.map((p) => (
                          <button
                            key={p}
                            onClick={() => {
                              setPillar(p);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-2xl text-left hover:bg-gray-50 transition-colors duration-150"
                          >
                            {p}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            </motion.div>
          )}

          {currentStep !== 'name' && currentStep !== 'pillar' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-5xl font-extrabold text-gray-900">Select your track</h2>
              <div className="grid grid-cols-1 gap-3">
                {pillar && TRACKS[pillar].map((track) => (
                  <button
                    key={track}
                    onClick={() => handleTrackSelect(track)}
                    className={`p-4 text-left rounded-lg border transition-colors duration-200 ${
                      selectedTrack === track
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{track}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'minors' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-5xl font-extrabold text-gray-900">Choose your minors</h2>
                <span className="text-lg font-medium text-gray-500">
                  {numMinors} of 2 minors selected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleMinorSelect(HASS_MINOR)}
                  disabled={isMinorDisabled(HASS_MINOR)}
                  className={`p-4 text-left rounded-lg border transition-colors duration-200 ${
                    selectedMinors.includes(HASS_MINOR)
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-900">{HASS_MINOR}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedMinors.length === 1 && !selectedMinors.includes(HASS_MINOR) 
                      ? 'Required for second minor' 
                      : 'Optional minor'}
                  </p>
                </button>
                {MINOR_OPTIONS.map((minor) => (
                  <button
                    key={minor}
                    onClick={() => handleMinorSelect(minor)}
                    disabled={isMinorDisabled(minor)}
                    className={`p-4 text-left rounded-lg border transition-colors duration-200 ${
                      selectedMinors.includes(minor)
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{minor}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          {currentStep !== 'name' && (
            <button
              onClick={handleBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            {currentStep === 'minors' ? 'Create Plan' : 'Next'}
            {currentStep !== 'minors' && <IconChevronRight className="ml-2 h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
} 