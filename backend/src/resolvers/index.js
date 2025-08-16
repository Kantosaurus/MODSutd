const userResolvers = require('./userResolvers');
const courseResolvers = require('./courseResolvers');
const enrollmentResolvers = require('./enrollmentResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...courseResolvers.Query,
    ...enrollmentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...courseResolvers.Mutation,
    ...enrollmentResolvers.Mutation,
  },
  User: userResolvers.User,
  Course: courseResolvers.Course,
  Enrollment: enrollmentResolvers.Enrollment,
};

module.exports = resolvers;