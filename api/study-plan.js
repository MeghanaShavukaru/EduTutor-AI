module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, goal, level = 'beginner', timeAvailable = '30 min/day' } = req.body || {};
  if (!topic || !goal) return res.status(400).json({ error: 'Topic and goal are required.' });

  const beginner = level.toLowerCase() === 'beginner';
  const steps = beginner
    ? [
        { title: 'Learn the core idea', detail: `Spend time understanding the basics of ${topic}.` },
        { title: 'Practice one small example', detail: `Build a tiny example related to ${topic}.` },
        { title: 'Review and reflect', detail: 'Write down what you understood and what needs more practice.' }
      ]
    : [
        { title: 'Break down the topic', detail: `Divide ${topic} into smaller concepts and identify gaps.` },
        { title: 'Build a mini project', detail: 'Apply the concepts in a small, meaningful implementation.' },
        { title: 'Debug and improve', detail: 'Review your work, fix issues, and document what you learned.' }
      ];

  return res.status(200).json({
    topic,
    goal,
    level,
    timeAvailable,
    summary: `A focused ${level} plan for ${topic} to help you reach ${goal} with ${timeAvailable} effort.`,
    steps,
    nextAction: steps[0].detail
  });
};
