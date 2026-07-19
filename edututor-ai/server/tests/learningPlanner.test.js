const test = require('node:test');
const assert = require('node:assert/strict');
const { generateStudyPlan } = require('../utils/learningPlanner');

test('generateStudyPlan creates a personalized learning plan', () => {
  const plan = generateStudyPlan({
    topic: 'React basics',
    goal: 'Build a small UI',
    level: 'beginner',
    timeAvailable: '60 min/day'
  });

  assert.equal(plan.topic, 'React basics');
  assert.ok(plan.summary.includes('React basics'));
  assert.ok(plan.steps.length >= 3);
  assert.equal(plan.steps[0].title, 'Start with components and props');
  assert.ok(plan.nextAction.includes('Build a small component'));
});
