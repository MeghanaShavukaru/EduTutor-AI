const { generateStudyPlan } = require('../../../utils/learningPlanner');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { topic, goal, level, timeAvailable } = req.body || {};

    if (!topic || !goal) {
      return res.status(400).json({ error: 'Topic and goal are required.' });
    }

    const plan = generateStudyPlan({ topic, goal, level, timeAvailable });
    return res.json(plan);
  } catch (err) {
    console.error('study-plan handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

