export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    studentId: String!
    name: String!
    emailVerified: Boolean!
    createdAt: String!
    enrollments: [Enrollment!]!
    progress: [Progress!]!
  }

  type Module {
    id: ID!
    code: String!
    name: String!
    description: String
    credits: Int!
    semester: String!
    year: Int!
    prerequisites: [String!]!
    createdAt: String!
    enrollments: [Enrollment!]!
    progress: [Progress!]!
  }

  type Enrollment {
    id: ID!
    user: User!
    module: Module!
    status: EnrollmentStatus!
    grade: String
    createdAt: String!
  }

  type Progress {
    id: ID!
    user: User!
    module: Module!
    completed: Boolean!
    percentage: Float!
    lastAccessed: String
    createdAt: String!
  }

  enum EnrollmentStatus {
    ENROLLED
    COMPLETED
    DROPPED
    FAILED
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    studentId: String!
    name: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ModuleInput {
    code: String!
    name: String!
    description: String
    credits: Int!
    semester: String!
    year: Int!
    prerequisites: [String!]!
  }

  input ProgressInput {
    moduleId: String!
    completed: Boolean
    percentage: Float
  }

  type Query {
    me: User
    modules: [Module!]!
    module(id: ID!): Module
    myEnrollments: [Enrollment!]!
    myProgress: [Progress!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    verifyEmail(token: String!): Boolean!
    enrollInModule(moduleId: String!): Enrollment!
    updateProgress(input: ProgressInput!): Progress!
    createModule(input: ModuleInput!): Module!
  }
`;