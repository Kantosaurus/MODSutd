import React, { useEffect, useState } from 'react';
import CourseCard from './ui/course-card';

interface TermBlock {
  term: string;
  year: string;
  description: string;
  color: string;
  courses?: Course[];
}

interface Course {
  courseNumber: string;
  courseTitle: string;
  description: string;
  learningObjectives?: string[];
  deliveryFormat?: string;
  gradingScheme?: string;
  workload?: string;
  credits?: number;
  tags?: string[];
}

const Calendar: React.FC = () => {
  const [term1Courses, setTerm1Courses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses from the sample file
    fetch('/sample responses/sample-courses.json')
      .then(response => response.json())
      .then(data => {
        // Filter courses for Term 1
        const term1Courses = data.courses.filter((course: Course) => 
          course.tags && course.tags.includes('Term 1')
        );
        setTerm1Courses(term1Courses);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Each array represents a row in the calendar
  // [Before Term Starts, Trimester 1, Trimester 2, Trimester 3]
  const calendarRows = [
    // Row 1 - Blank, Blank, Blank, Term 1
    [
      { term: '', year: '', description: '', color: 'bg-gray-100' },
      { term: '', year: '', description: '', color: 'bg-gray-100' },
      { term: '', year: '', description: '', color: 'bg-gray-100' },
      { 
        term: 'Term 1', 
        year: 'Year 1', 
        description: 'Freshmore', 
        color: 'bg-pink-100',
        courses: term1Courses
      },
    ],
    // Row 2 - IAP, Term 2, Term 3, Vacation
    [
      { term: 'IAP', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 2', year: 'Year 1', description: 'Freshmore', color: 'bg-pink-100' },
      { term: 'Term 3', year: 'Year 2', description: 'Freshmore', color: 'bg-blue-100' },
      { term: 'Vacation', year: '', description: '', color: 'bg-gray-100' },
    ],
    // Row 3 - IAP, Term 4, Term 5, Vacation
    [
      { term: 'IAP', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 4', year: 'Year 2', description: 'Sophomore', color: 'bg-blue-100' },
      { term: 'Term 5', year: 'Year 3', description: 'Junior', color: 'bg-orange-100' },
      { term: 'Vacation', year: '', description: '', color: 'bg-gray-100' },
    ],
    // Row 4 - IAP, Term 6, Vacation, Term 7
    [
      { term: 'IAP', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 6', year: 'Year 3', description: 'Junior, Internship/GEXP/Local exchange', color: 'bg-orange-100' },
      { term: 'Vacation', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 7', year: 'Year 4', description: 'Senior, Capstone', color: 'bg-purple-100' },
    ],
    // Row 5 - IAP, Term 8, M.Arch Internship, Term 9
    [
      { term: 'IAP', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 8', year: 'Year 4', description: 'Senior, Capstone', color: 'bg-purple-100' },
      { term: 'M.Arch structured internship', year: 'M.Arch', description: '', color: 'bg-gray-100' },
      { term: 'Term 9', year: 'M.Arch', description: 'Master of Architecture (M.Arch)', color: 'bg-green-100' },
    ],
    // Row 6 - IAP, Term 10
    [
      { term: 'IAP', year: '', description: '', color: 'bg-gray-100' },
      { term: 'Term 10', year: 'M.Arch', description: 'Master of Architecture (M.Arch)', color: 'bg-green-100' },
      { term: '', year: '', description: '', color: 'bg-gray-100' },
      { term: '', year: '', description: '', color: 'bg-gray-100' },
    ],
  ];

  const trimesterHeaders = [
    { label: 'BEFORE TERM STARTS', months: 'Jan' },
    { label: 'TRIMESTER 1', months: 'Jan - Apr' },
    { label: 'TRIMESTER 2', months: 'May - Aug' },
    { label: 'TRIMESTER 3', months: 'Sep - Dec' },
  ];

  // Helper function to determine text color based on background
  const getTextColor = (bgColor: string) => {
    return bgColor === 'bg-gray-100' ? 'text-gray-600' : 'text-gray-800';
  };

  // Helper function to determine border color based on background
  const getBorderColor = (bgColor: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-pink-100': 'border-pink-200',
      'bg-blue-100': 'border-blue-200',
      'bg-orange-100': 'border-orange-200',
      'bg-purple-100': 'border-purple-200',
      'bg-green-100': 'border-green-200',
      'bg-gray-100': 'border-gray-200',
    };
    return colorMap[bgColor] || 'border-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">
      <div className="grid grid-cols-4 gap-3">
        {/* Trimester Headers */}
        {trimesterHeaders.map((header, index) => (
          <div 
            key={index} 
            className="bg-gray-900 text-white p-4 rounded-lg shadow-sm"
          >
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
              {header.months}
            </div>
            <div className="font-medium">
              {header.label}
            </div>
          </div>
        ))}

        {/* Calendar Grid */}
        <div className="col-span-4 grid grid-cols-4 gap-3 mt-3">
          {calendarRows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((block, blockIndex) => (
                <div
                  key={`${rowIndex}-${blockIndex}`}
                  className={`
                    p-4 rounded-lg shadow-sm border
                    ${block.color}
                    ${getBorderColor(block.color)}
                    ${getTextColor(block.color)}
                    transition-all duration-200
                    hover:shadow-md hover:scale-[1.02]
                    ${!block.term ? 'opacity-50' : ''}
                  `}
                >
                  {block.term && (
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="font-medium">
                          {block.term}
                        </div>
                        {block.year && (
                          <div className="text-xs px-2 py-1 bg-white/50 rounded-full">
                            {block.year}
                          </div>
                        )}
                      </div>
                      {block.description && (
                        <div className="text-sm opacity-75">
                          {block.description}
                        </div>
                      )}
                      {block.courses && block.courses.length > 0 && (
                        <CourseCard courses={block.courses} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 