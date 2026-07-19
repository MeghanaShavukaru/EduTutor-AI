module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    return res.json([
      { course: 'Math', assignment: 'Algebra Worksheet', due: '2025-06-20' },
      { course: 'Science', assignment: 'Lab Report', due: '2025-06-22' }
    ]);
  } catch (err) {
    console.error('assignments handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

