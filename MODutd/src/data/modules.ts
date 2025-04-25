export interface Module {
  code: string;
  title: string;
  description: string;
  courseType: string;
  term: number;
  pillar: string;
  credits: number;
  learningObjectives?: string[];
  deliveryFormat?: string;
  gradingScheme?: string;
  workload?: string;
  imageUrl?: string | null;
}

// Sample courses data from JSON
const sampleCourses = {
  "courses": [
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d3",
      "courseNumber": "10.014",
      "courseTitle": "Computational Thinking for Design",
      "description": "An introductory programming course that combines programming both in the architectural design and computing contexts targeted at novice programmers. It will introduce students to programming and design computing skills that are essential for their studies in SUTD, regardless of pillar choice. Students will learn visual programming and python programming together with design concepts, and will apply these skills in related projects.",
      "learningObjectives": [
        "Acquire conceptual knowledge and skills for visual and python programming",
        "Acquire basic knowledge of computational geometry concepts",
        "Develop hands‐on experience with applying computational thinking approaches to explore solutions to design and engineering problems",
        "Gain skills in programming the Raspberry pi microcontroller",
        "Learn and practice effective technical communication skills for formal written reports"
      ],
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": "Students are graded based on regular coursework, individual and group assignments, tests and quizzes.",
      "workload": "5-0-7 (two 2.5 hours cohort sessions)",
      "credits": 12,
      "tags": ["Freshmore Core", "Term 1", "ASD", "CSD"],
      "imageUrl": "/images/algorithms.jpg"
    },
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d4",
      "courseNumber": "01.018",
      "courseTitle": "Design Thinking Project I",
      "description": "Design Thinking Projects I, II, and III provide the Freshmore students the opportunity to learn and practice fundamental design thinking principles. Students are introduced to design thinking through a series of design-centric, interdisciplinary, multidisciplinary, hands-on projects and seminars, guided by a yearly general theme to ensure integrated pedagogy and progressive learning. Moreover, the projects and their solutions are expected to impact areas of growth at SUTD, such as healthcare, cities, aviation, and data science.\n\n01.018 Design Thinking Project I in term 1 is a guided project, 01.019 Design Thinking Projects II in term 2 is integrated with 3.007 Design Thinking and Innovation course, while 01.020 Design Thinking Project III in term 3 allows the students with more scope for self-guidance. Ultimately, the courses are designed to equip the students with a series of design thinking, technical, contextual, organizational, leadership, scientific and technological skills and competencies.",
      "learningObjectives": null,
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": null,
      "workload": null,
      "credits": 12,
      "tags": ["Freshmore Core", "Term 1", "SMT"],
      "imageUrl": null
    },
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d5",
      "courseNumber": "01.019",
      "courseTitle": "Design Thinking Project II",
      "description": "Design Thinking Projects I, II, and III provide the Freshmore students the opportunity to learn and practice fundamental design thinking principles. Students are introduced to design thinking through a series of design-centric, interdisciplinary, multidisciplinary, hands-on projects and seminars, guided by a yearly general theme to ensure integrated pedagogy and progressive learning. Moreover, the projects and their solutions are expected to impact areas of growth at SUTD, such as healthcare, cities, aviation, and data science.\n\n01.018 Design Thinking Project I in term 1 is a guided project, 01.019 Design Thinking Projects II in term 2 is integrated with 3.007 Design Thinking and Innovation course, while 01.020 Design Thinking Project III in term 3 allows the students with more scope for self-guidance. Ultimately, the courses are designed to equip the students with a series of design thinking, technical, contextual, organizational, leadership, scientific and technological skills and competencies.",
      "learningObjectives": null,
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": null,
      "workload": null,
      "credits": 12,
      "tags": ["Freshmore Core", "Term 2", "SMT"],
      "imageUrl": null
    },
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d6",
      "courseNumber": "01.020",
      "courseTitle": "Design Thinking Project III",
      "description": "Design Thinking Projects I, II, and III provide the Freshmore students the opportunity to learn and practice fundamental design thinking principles. Students are introduced to design thinking through a series of design-centric, interdisciplinary, multidisciplinary, hands-on projects and seminars, guided by a yearly general theme to ensure integrated pedagogy and progressive learning. Moreover, the projects and their solutions are expected to impact areas of growth at SUTD, such as healthcare, cities, aviation, and data science.\n\n01.018 Design Thinking Project I in term 1 is a guided project, 01.019 Design Thinking Projects II in term 2 is integrated with 3.007 Design Thinking and Innovation course, while 01.020 Design Thinking Project III in term 3 allows the students with more scope for self-guidance. Ultimately, the courses are designed to equip the students with a series of design thinking, technical, contextual, organizational, leadership, scientific and technological skills and competencies.",
      "learningObjectives": null,
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": null,
      "workload": null,
      "credits": 12,
      "tags": ["Freshmore Core", "Term 3", "SMT"],
      "imageUrl": null
    },
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d7",
      "courseNumber": "10.013",
      "courseTitle": "Modelling and Analysis",
      "description": "The main objective of this course is to provide students firm foundations of single variable calculus so that they can apply calculus to model, solve and analyse applied math problems. It aims to motivate students on the importance of calculus through a plethora of applications in engineering, physical and biological sciences, computer science, finance, economics, probability and statistics and other topics. On top of the basic concepts, techniques and applications of two branches of calculus – differentiation and integration, students will also learn to use simple software to implement numerical methods in calculus.",
      "learningObjectives": [
        "Explain the geometrical and physical meaning of derivatives.",
        "Compute derivatives using the rules of calculus.",
        "Apply derivatives and calculus theorems to sketch graphs, find maxima, minima and accurate numerical approximations in problems coming from engineering and science.",
        "Explain the Fundamental Theorem of Calculus.",
        "Compute exact integrals by integration techniques.",
        "Apply numerical integrations to approximate definite integrals.",
        "Use integral calculus to solve basic differential equations.",
        "Use integral calculus to solve for important quantities that can be modelled by Riemann sums, such as areas, volumes, arc lengths, center of mass, moment of inertia, etc.",
        "Analyse the solutions obtained by calculus based on the context.",
        "Apply Excel to implement numerical methods to solve problems coming from engineering and science."
      ],
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": "Students are graded based on exam test results, quizzes, class participations, homework, and team-based design projects (eg. 1D and 2D projects etc).",
      "workload": "6-0-6*",
      "credits": 12,
      "tags": ["Freshmore Core", "Term 1", "SMT"],
      "imageUrl": null
    },
    {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d8",
      "courseNumber": "10.015",
      "courseTitle": "Physical World",
      "description": "Emphasises on providing students with the ability to understand and explain the inner mechanism of the physical world based on the principles of mechanics and thermodynamics. It aims to help students appreciate the beauty of physics and enable them to apply key concepts learnt to evaluate and address physics-based problems to make a positive impact on the world. By using concepts established through simplified mathematical models, reverse engineering case studies and experiential learning through hands-on demonstrations, connections between physics concepts and theoretical models are reinforced with practice.",
      "learningObjectives": [
        "Linear motion kinematics",
        "Newton's 3 laws of motion and dynamics of system",
        "Circular motion kinematics and dynamics",
        "Rotational motion and torque on rigid body",
        "Work done, general concepts of energy and conservative force",
        "Center of mass, linear and angular momentum",
        "Conservation laws of energy, linear momentum, and angular momentum",
        "General ideas about thermodynamics such as temperature, heat and heat cycle, entropy and simple engines"
      ],
      "deliveryFormat": "In-person cohort sessions",
      "gradingScheme": "Students are graded based on exam test results, class participations, home works, and team-based design projects.",
      "workload": "5-0-7 (two 2.5 hours cohort sessions) *",
      "credits": 12,
      "tags": ["Freshmore Core", "Term 1", "SMT"],
      "imageUrl": null
    }
  ]
};

// Transform the sample courses into our Module interface format
export const modules: Module[] = sampleCourses.courses.map(course => {
  // Extract term number from tags
  const termTag = course.tags.find(tag => tag.startsWith('Term '));
  const term = termTag ? parseInt(termTag.split(' ')[1]) : 1;

  // Extract course type from tags
  const courseTypeTag = course.tags.find(tag => 
    tag === 'Freshmore Core' || 
    tag === 'Core' || 
    tag === 'Elective' || 
    tag === 'Freshmore Elective'
  );

  // Extract pillar from tags
  const pillarTag = course.tags.find(tag => 
    ['ASD', 'CSD', 'EPD', 'ESD', 'DAI', 'HASS', 'SMT'].includes(tag)
  );

  return {
    code: course.courseNumber,
    title: course.courseTitle,
    description: course.description,
    courseType: courseTypeTag || 'Core',
    term: term,
    pillar: pillarTag || 'SMT',
    credits: course.credits,
    learningObjectives: course.learningObjectives || undefined,
    deliveryFormat: course.deliveryFormat || undefined,
    gradingScheme: course.gradingScheme || undefined,
    workload: course.workload || undefined,
    imageUrl: course.imageUrl || undefined
  };
}); 