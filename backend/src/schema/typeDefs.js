const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Course {
    id: ID!
    code: String!
    name: String!
    overview: String
    description: String
    credits: Int!
    learningObjectives: String
    measurableOutcomes: String
    topicsCovered: String
    textbooks: String
    deliveryFormat: String
    gradingScheme: String
    terms: String
    professors: String
    tags: String
    prerequisites: [Course!]!
    corequisites: [Course!]!
    createdAt: String!
    updatedAt: String!
  }

  type Enrollment {
    id: ID!
    user: User!
    course: Course!
    semester: String!
    year: Int!
    grade: String
    status: EnrollmentStatus!
    enrolledAt: String!
  }

  enum EnrollmentStatus {
    ENROLLED
    COMPLETED
    DROPPED
    WITHDRAWN
  }

  type Query {
    # User queries
    me: User
    users: [User!]!
    user(id: ID!): User

    # Course queries
    courses: [Course!]!
    course(id: ID!): Course
    courseByCode(code: String!): Course
    coursesByCode(code: String!): [Course!]!

    # Enrollment queries
    enrollments: [Enrollment!]!
    enrollment(id: ID!): Enrollment
    userEnrollments(userId: ID!): [Enrollment!]!
    courseEnrollments(courseId: ID!): [Enrollment!]!

    # Graph queries (using GraphDB)
    coursePrerequisites(courseId: ID!): [Course!]!
    courseCorequisites(courseId: ID!): [Course!]!
    recommendedCourses(userId: ID!): [Course!]!
  }

  type Mutation {
    # User mutations
    register(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    requestPasswordReset(email: String!): PasswordResetResponse!
    resetPassword(token: String!, newPassword: String!): PasswordResetResponse!

    # Course mutations
    createCourse(input: CourseInput!): Course!
    updateCourse(id: ID!, input: CourseUpdateInput!): Course!
    deleteCourse(id: ID!): Boolean!

    # Enrollment mutations
    enrollInCourse(courseId: ID!): Enrollment!
    dropCourse(enrollmentId: ID!): Boolean!
    updateGrade(enrollmentId: ID!, grade: String!): Enrollment!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PasswordResetResponse {
    success: Boolean!
    message: String!
    token: String
  }

  input CourseInput {
    code: String!
    name: String!
    overview: String
    description: String
    credits: Int!
    learningObjectives: String
    measurableOutcomes: String
    topicsCovered: String
    textbooks: String
    deliveryFormat: String
    gradingScheme: String
    terms: String
    professors: String
    tags: String
    prerequisiteIds: [ID!]
    corequisiteIds: [ID!]
  }

  input CourseUpdateInput {
    code: String
    name: String
    overview: String
    description: String
    credits: Int
    learningObjectives: String
    measurableOutcomes: String
    topicsCovered: String
    textbooks: String
    deliveryFormat: String
    gradingScheme: String
    terms: String
    professors: String
    tags: String
    prerequisiteIds: [ID!]
    corequisiteIds: [ID!]
  }
`;

module.exports = typeDefs;