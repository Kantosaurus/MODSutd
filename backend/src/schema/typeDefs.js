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
    description: String
    credits: Int!
    prerequisites: [Course!]!
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
    coursesByCode(code: String!): [Course!]!

    # Enrollment queries
    enrollments: [Enrollment!]!
    enrollment(id: ID!): Enrollment
    userEnrollments(userId: ID!): [Enrollment!]!
    courseEnrollments(courseId: ID!): [Enrollment!]!

    # Graph queries (using GraphDB)
    coursePrerequisites(courseId: ID!): [Course!]!
    recommendedCourses(userId: ID!): [Course!]!
  }

  type Mutation {
    # User mutations
    register(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

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

  input CourseInput {
    code: String!
    name: String!
    description: String
    credits: Int!
    prerequisiteIds: [ID!]
  }

  input CourseUpdateInput {
    code: String
    name: String
    description: String
    credits: Int
    prerequisiteIds: [ID!]
  }
`;

module.exports = typeDefs;