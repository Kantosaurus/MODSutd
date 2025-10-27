const { pool } = require('../database/postgresql');
const { getGraphDBSession } = require('../database/graphdb');

const courseResolvers = {
  Query: {
    courses: async () => {
      try {
        console.log('📚 Fetching all courses from database...');
        const result = await pool.query('SELECT * FROM courses ORDER BY code');
        console.log(`✅ Found ${result.rows.length} courses`);

        if (result.rows.length === 0) {
          console.warn('⚠️  No courses found in database. Has migration run?');
        }

        return result.rows;
      } catch (error) {
        console.error('❌ Error fetching courses:', error);
        throw new Error(`Failed to fetch courses: ${error.message}`);
      }
    },

    course: async (parent, { id }) => {
      const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
      return result.rows[0];
    },

    courseByCode: async (parent, { code }) => {
      const result = await pool.query(
        'SELECT * FROM courses WHERE code = $1',
        [code]
      );
      return result.rows[0];
    },

    coursesByCode: async (parent, { code }) => {
      const result = await pool.query(
        'SELECT * FROM courses WHERE code ILIKE $1',
        [`%${code}%`]
      );
      return result.rows;
    },

    coursePrerequisites: async (parent, { courseId }) => {
      const session = getGraphDBSession();
      try {
        const result = await session.run(
          `MATCH (c:Course {id: $courseId})-[:REQUIRES]->(prereq:Course)
           RETURN prereq`,
          { courseId }
        );

        const prerequisiteIds = result.records.map(record => record.get('prereq').properties.id);

        if (prerequisiteIds.length === 0) return [];

        // Fetch full course details from PostgreSQL
        const coursesResult = await pool.query(
          'SELECT * FROM courses WHERE id = ANY($1)',
          [prerequisiteIds]
        );

        return coursesResult.rows;
      } finally {
        await session.close();
      }
    },

    courseCorequisites: async (parent, { courseId }) => {
      const session = getGraphDBSession();
      try {
        const result = await session.run(
          `MATCH (c:Course {id: $courseId})-[:COREQUISITE]->(coreq:Course)
           RETURN coreq`,
          { courseId }
        );

        const corequisiteIds = result.records.map(record => record.get('coreq').properties.id);

        if (corequisiteIds.length === 0) return [];

        // Fetch full course details from PostgreSQL
        const coursesResult = await pool.query(
          'SELECT * FROM courses WHERE id = ANY($1)',
          [corequisiteIds]
        );

        return coursesResult.rows;
      } finally {
        await session.close();
      }
    },

    recommendedCourses: async (parent, { userId }) => {
      const session = getGraphDBSession();
      try {
        // This is a simplified recommendation algorithm
        // In practice, you'd want more sophisticated logic
        const result = await session.run(
          `MATCH (u:User {id: $userId})-[:ENROLLED_IN]->(completed:Course)
           MATCH (completed)-[:PREREQUISITE_OF]->(recommended:Course)
           WHERE NOT (u)-[:ENROLLED_IN]->(recommended)
           RETURN DISTINCT recommended`,
          { userId }
        );
        
        const recommendations = result.records.map(record => record.get('recommended').properties);
        return recommendations;
      } finally {
        await session.close();
      }
    },
  },

  Mutation: {
    createCourse: async (parent, { input }) => {
      const { code, name, description, credits, prerequisiteIds } = input;
      
      const result = await pool.query(
        'INSERT INTO courses (code, name, description, credits) VALUES ($1, $2, $3, $4) RETURNING *',
        [code, name, description, credits]
      );
      
      const course = result.rows[0];

      // Add to GraphDB
      const session = getGraphDBSession();
      try {
        await session.run(
          'CREATE (c:Course {id: $id, code: $code, name: $name, credits: $credits})',
          { 
            id: course.id, 
            code: course.code, 
            name: course.name, 
            credits: course.credits 
          }
        );

        // Add prerequisite relationships
        if (prerequisiteIds && prerequisiteIds.length > 0) {
          for (const prereqId of prerequisiteIds) {
            await session.run(
              `MATCH (prereq:Course {id: $prereqId}), (course:Course {id: $courseId})
               CREATE (prereq)-[:PREREQUISITE_OF]->(course)`,
              { prereqId, courseId: course.id }
            );
          }
        }
      } finally {
        await session.close();
      }

      return course;
    },

    updateCourse: async (parent, { id, input }) => {
      const { code, name, description, credits } = input;
      
      const result = await pool.query(
        'UPDATE courses SET code = COALESCE($1, code), name = COALESCE($2, name), description = COALESCE($3, description), credits = COALESCE($4, credits), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
        [code, name, description, credits, id]
      );
      
      return result.rows[0];
    },

    deleteCourse: async (parent, { id }) => {
      const result = await pool.query('DELETE FROM courses WHERE id = $1', [id]);
      
      // Remove from GraphDB
      const session = getGraphDBSession();
      try {
        await session.run('MATCH (c:Course {id: $id}) DETACH DELETE c', { id });
      } finally {
        await session.close();
      }
      
      return result.rowCount > 0;
    },
  },

  Course: {
    prerequisites: async (parent) => {
      const session = getGraphDBSession();
      try {
        const result = await session.run(
          `MATCH (c:Course {id: $courseId})-[:REQUIRES]->(prereq:Course)
           RETURN prereq`,
          { courseId: parent.id.toString() }
        );

        const prerequisiteIds = result.records.map(record => record.get('prereq').properties.id);

        if (prerequisiteIds.length === 0) return [];

        // Fetch full course details from PostgreSQL
        const coursesResult = await pool.query(
          'SELECT * FROM courses WHERE id = ANY($1)',
          [prerequisiteIds]
        );

        return coursesResult.rows;
      } finally {
        await session.close();
      }
    },

    corequisites: async (parent) => {
      const session = getGraphDBSession();
      try {
        const result = await session.run(
          `MATCH (c:Course {id: $courseId})-[:COREQUISITE]->(coreq:Course)
           RETURN coreq`,
          { courseId: parent.id.toString() }
        );

        const corequisiteIds = result.records.map(record => record.get('coreq').properties.id);

        if (corequisiteIds.length === 0) return [];

        // Fetch full course details from PostgreSQL
        const coursesResult = await pool.query(
          'SELECT * FROM courses WHERE id = ANY($1)',
          [corequisiteIds]
        );

        return coursesResult.rows;
      } finally {
        await session.close();
      }
    },

    // Map database fields to GraphQL fields (camelCase conversion)
    learningObjectives: (parent) => parent.learning_objectives,
    measurableOutcomes: (parent) => parent.measurable_outcomes,
    topicsCovered: (parent) => parent.topics_covered,
    deliveryFormat: (parent) => parent.delivery_format,
    gradingScheme: (parent) => parent.grading_scheme,
    createdAt: (parent) => parent.created_at,
    updatedAt: (parent) => parent.updated_at,
  },
};

module.exports = courseResolvers;