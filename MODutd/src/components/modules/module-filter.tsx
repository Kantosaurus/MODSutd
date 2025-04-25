import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleFilterProps {
  filters: {
    courseType: string;
    term: string;
    pillar: string;
  };
  onFilterChange: (filters: {
    courseType: string;
    term: string;
    pillar: string;
  }) => void;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const courseTypes = [
  { value: 'all', label: 'All Course Types' },
  { value: 'Core', label: 'Core' },
  { value: 'Elective', label: 'Elective/Technical Elective' },
  { value: 'Freshmore Core', label: 'Freshmore Core' },
  { value: 'Freshmore Elective', label: 'Freshmore Elective' }
];

const terms = [
  { value: 'all', label: 'All Terms' },
  { value: '1', label: 'Term 1' },
  { value: '2', label: 'Term 2' },
  { value: '3', label: 'Term 3' },
  { value: '4', label: 'Term 4' },
  { value: '5', label: 'Term 5' },
  { value: '6', label: 'Term 6' },
  { value: '7', label: 'Term 7' },
  { value: '8', label: 'Term 8' }
];

const pillars = [
  { value: 'all', label: 'All Pillars' },
  { value: 'CSD', label: 'CSD' },
  { value: 'ASD', label: 'ASD' },
  { value: 'EPD', label: 'EPD' },
  { value: 'ESD', label: 'ESD' },
  { value: 'DAI', label: 'DAI' },
  { value: 'HASS', label: 'HASS' }
];

function CustomDropdown({ options, value, onChange, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || { label: placeholder };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
      >
        <span className="truncate">{selectedOption.label}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                    option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ModuleFilter({ filters, onFilterChange }: ModuleFilterProps) {
  const handleChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <CustomDropdown
            options={courseTypes}
            value={filters.courseType}
            onChange={(value) => handleChange('courseType', value)}
            placeholder="Select Course Type"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <CustomDropdown
            options={terms}
            value={filters.term}
            onChange={(value) => handleChange('term', value)}
            placeholder="Select Term"
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <CustomDropdown
            options={pillars}
            value={filters.pillar}
            onChange={(value) => handleChange('pillar', value)}
            placeholder="Select Pillar"
          />
        </div>
      </div>
    </div>
  );
} 