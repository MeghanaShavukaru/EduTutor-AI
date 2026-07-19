function generateStudyPlan({ topic, goal, level = 'beginner', timeAvailable = '30 min/day' }) {
  const normalizedLevel = level.toLowerCase();
  const steps = [];

  if (normalizedLevel === 'beginner') {
    steps.push({ title: 'Start with components and props', detail: 'Learn the core idea behind UI building before moving to state.' });
    steps.push({ title: 'Practice one small example', detail: 'Create a tiny component and render data into it.' });
    steps.push({ title: 'Review and reflect', detail: 'Write 3 bullet points about what you understood and what felt unclear.' });
  } else {
    steps.push({ title: 'Break the topic into concepts', detail: 'Map the subject into smaller learning chunks and identify gaps.' });
    steps.push({ title: 'Build a mini project', detail: 'Apply the concepts in a small but meaningful implementation.' });
    steps.push({ title: 'Debug and improve', detail: 'Fix issues, refactor, and document your learning.' });
  }

  return {
    topic,
    goal,
    level: normalizedLevel,
    timeAvailable,
    summary: `A focused ${normalizedLevel} plan for ${topic} that helps you reach ${goal} with ${timeAvailable} effort.`,
    steps,
    nextAction: `Build a small component or demo for ${topic} to practice the core idea today.`
  };
}

module.exports = { generateStudyPlan };
