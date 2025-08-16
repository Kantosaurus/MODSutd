const { pool } = require('../database/postgresql');
const { getGraphDBSession } = require('../database/graphdb');

const enrollmentResolvers = {
  Query: {
    enrollments: async () => {
      const result = await pool.query(`
        SELECT e.*, u.name as user_name, u.email as user_email, c.code as course_code, c.name as course_name
        FROM enrollments e
        JOIN users u ON e.user_id = u.id
        JOIN courses c ON e.course_id = c.id
        ORDER BY e.enrolled_at DESC
      `);
      return result.rows;
    },

    enrollment: async (parent, { id }) => {
      const result = await pool.query(`
        SELECT e.*, u.name as user_name, u.email as user_email, c.code as course_code, c.name as course_name
        FROM enrollments e
        JOIN users u ON e.user_id = u.id
        JOIN courses c ON e.course_id = c.id
        WHERE e.id = $1
      `, [id]);
      return result.rows[0];
    },

    userEnrollments: async (parent, { userId }) => {
      const result = await pool.query(`
        SELECT e.*, c.code as course_code, c.name as course_name
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = $1
        ORDER BY e.enrolled_at DESC
      `, [userId]);
      return result.rows;
    },

    courseEnrollments: async (parent, { courseId }) => {
      const result = await pool.query(`
        SELECT e.*, u.name as user_name, u.email as user_email
        FROM enrollments e
        JOIN users u ON e.user_id = u.id
        WHERE e.course_id = $1
        ORDER BY e.enrolled_at DESC
      `, [courseId]);
      return result.rows;
    },
  },

  Mutation: {
    enrollInCourse: async (parent, { courseId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      // Check if already enrolled
      const existingEnrollment = await pool.query(
        'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2 AND status != $3',
        [user.id, courseId, 'DROPPED']
      );

      if (existingEnrollment.rows.length > 0) {
        throw new Error('Already enrolled in this course');
      }

      // Create enrollment
      const result = await pool.query(
        'INSERT INTO enrollments (user_id, course_id, semester, year, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user.id, courseId, 'Spring', new Date().getFullYear(), 'ENROLLED']
      );

      const enrollment = result.rows[0];

      // Add to GraphDB
      const session = getGraphDBSession();
      try {
        await session.run(
          `MATCH (u:User {id: $userId}), (c:Course {id: $courseId})
           CREATE (u)-[:ENROLLED_IN {semester: $semester, year: $year, status: $status}]->(c)`,
          { 
            userId: user.id, 
            courseId, 
            semester: enrollment.semester, 
            year: enrollment.year, 
            status: enrollment.status 
          }
        );
      } finally {
        await session.close();
      }

      return enrollment;
    },

    dropCourse: async (parent, { enrollmentId }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const result = await pool.query(
        'UPDATE enrollments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *',
        ['DROPPED', enrollmentId, user.id]
      );

      if (result.rows.length === 0) {
        throw new Error('Enrollment not found or not authorized');
      }

      // Update in GraphDB
      const enrollment = result.rows[0];
      const session = getGraphDBSession();
      try {
        await session.run(
          `MATCH (u:User {id: $userId})-[r:ENROLLED_IN]->(c:Course {id: $courseId})
           SET r.status = $status`,
          { 
            userId: user.id, 
            courseId: enrollment.course_id, 
            status: 'DROPPED' 
          }
        );
      } finally {
        await session.close();
      }

      return true;
    },

    updateGrade: async (parent, { enrollmentId, grade }, { user }) => {
      if (!user) throw new Error('Not authenticated');

      const result = await pool.query(
        'UPDATE enrollments SET grade = $1, status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [grade, 'COMPLETED', enrollmentId]
      );

      if (result.rows.length === 0) {
        throw new Error('Enrollment not found');
      }

      return result.rows[0];
    },
  },

  Enrollment: {
    user: async (parent) => {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [parent.user_id]);
      return result.rows[0];
    },

    course: async (parent) => {
      const result = await pool.query('SELECT * FROM courses WHERE id = $1', [parent.course_id]);
      return result.rows[0];
    },
  },
};

module.exports = enrollmentResolvers;