const test = require('node:test');
const assert = require('node:assert/strict');
const { getLocalTutorAnswer } = require('../routes/api');

test('returns a beginner-friendly explanation for what-is questions', () => {
  const answer = getLocalTutorAnswer('what is react');
  assert.match(answer, /React/i);
  assert.match(answer, /component|interface|library/i);
});

test('returns step-by-step guidance for how-to questions', () => {
  const answer = getLocalTutorAnswer('how do I learn Python fast');
  assert.match(answer, /step|practice|build|start/i);
});

test('returns a clear explanation for why questions', () => {
  const answer = getLocalTutorAnswer('why is CSS important');
  assert.match(answer, /style|layout|visual/i);
});

test('returns a study plan for planning questions', () => {
  const answer = getLocalTutorAnswer('give me a study plan for React');
  assert.match(answer, /plan|day|practice|review/i);
});
