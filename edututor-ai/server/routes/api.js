const express = require('express');
const axios = require('axios');
const router = express.Router();
const { generateStudyPlan } = require('../utils/learningPlanner');

async function getExternalTutorAnswer(question) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await axios.post(
      process.env.OPENAI_API_BASE || 'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an encouraging tutor for students learning coding and technology. Give concise, beginner-friendly answers with a small example when helpful.'
          },
          {
            role: 'user',
            content: `${question}\n\nAnswer clearly and briefly.`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        timeout: 10000
      }
    );

    return response.data?.choices?.[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.warn('External tutor unavailable, falling back to local tutor:', error.message);
    return null;
  }
}

function getLocalTutorAnswer(question) {
  const text = question.toLowerCase().trim();

  if (!text) {
    return 'Please ask a question and I will help explain it clearly.';
  }

  if (text.includes('study plan') || text.includes('plan')) {
    return 'A good study plan breaks a topic into small daily goals, includes practice time, and ends with review. For example: learn one concept, build a tiny example, and write down what you understood.';
  }

  if (text.includes('react') && text.includes('component')) {
    return 'In React, a component is a reusable UI building block. It can be a function or a class, and it returns JSX that renders on the screen.';
  }

  if (text.includes('react') && text.includes('state')) {
    return 'In React, state is data that can change over time. When state updates, the UI re-renders so the user sees the latest values.';
  }

  if (text.includes('react') && text.includes('props')) {
    return 'Props are values passed from a parent component to a child component. They let components share data without changing their own internal state.';
  }

  if (text.includes('react') && text.includes('hook')) {
    return 'Hooks let functional components use React features like state and effects. Common hooks are useState and useEffect.';
  }

  if (text.includes('react')) {
    return 'React is a JavaScript library for building user interfaces. Its main ideas are components, props, state, and hooks.';
  }

  if (text.includes('python') && text.includes('function')) {
    return 'In Python, a function is a reusable block of code. It helps you avoid repetition and keeps your program organized.';
  }

  if (text.includes('python') && text.includes('loop')) {
    return 'Loops in Python repeat a block of code until a condition is met. The common loop types are for loops and while loops.';
  }

  if (text.includes('python')) {
    return 'Python is a beginner-friendly language used for automation, data science, web development, and AI. Start with variables, loops, functions, lists, and conditionals.';
  }

  if (text.includes('javascript') || text.includes('js')) {
    return 'JavaScript makes web pages interactive. It helps with events, form handling, dynamic content, and communication with servers.';
  }

  if (text.includes('api')) {
    return 'An API is a way for one program to talk to another. Think of it like a menu at a restaurant: you request something and the service returns the data you need.';
  }

  if (text.includes('database') || text.includes('sql')) {
    return 'A database stores information so it can be retrieved later. SQL is the language used to ask questions like “show me all users” or “find the latest orders.”';
  }

  if (text.includes('git')) {
    return 'Git is a version control tool that helps you track changes in your projects. It makes it easier to save progress, collaborate, and undo mistakes.';
  }

  if (text.includes('ai') || text.includes('artificial intelligence')) {
    return 'Artificial intelligence is the field of building systems that can learn patterns, make predictions, or solve tasks. In practice, AI often uses data, algorithms, and training examples.';
  }

  if (text.includes('css') || text.includes('tailwind')) {
    return 'CSS controls the visual style of a page. Tailwind is a utility-first CSS framework that helps you style elements quickly with small classes.';
  }

  if (text.includes('debug') || text.includes('error') || text.includes('bug')) {
    return 'When something is broken, start by reading the error carefully, reproduce it, and isolate the smallest part that fails. Then test one change at a time and verify the result.';
  }

  if (text.includes('what is')) {
    return `That is a great beginner question. A simple way to explain it is: ${question}. Try asking for a short definition, a real-world example, or a beginner-friendly explanation.`;
  }

  if (text.includes('how')) {
    return `A good way to approach that is to break it into small steps. Start with the basics, try a simple example, and test your understanding by explaining it in your own words.`;
  }

  if (text.includes('why')) {
    return `It matters because it helps you understand the purpose behind the concept. The best way to learn it is to connect it to a simple example.`;
  }

  if (text.includes('compare') || text.includes('difference')) {
    return `A strong comparison starts with the main idea, the key differences, and a short example of when each one is useful. That makes the answer easier to understand.`;
  }

  return `That is a solid question. I would explain it by breaking it into three parts: what it is, why it matters, and how you would use it in practice. If you want, I can turn this into a short definition, a step-by-step guide, or a beginner example.`;
}

async function getTutorAnswer(question) {
  const externalAnswer = await getExternalTutorAnswer(question);
  if (externalAnswer) return externalAnswer;
  return getLocalTutorAnswer(question);
}

router.post('/tutor', async (req, res) => {
  const question = req.body.question || req.body.prompt || '';

  if (!question.trim()) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  const answer = await getTutorAnswer(question);
  res.json({ answer });
});

router.post('/study-plan', (req, res) => {
  const { topic, goal, level, timeAvailable } = req.body;

  if (!topic || !goal) {
    return res.status(400).json({ error: 'Topic and goal are required.' });
  }

  const plan = generateStudyPlan({ topic, goal, level, timeAvailable });
  res.json(plan);
});

// Optional LMS assignment route
router.get('/lms/assignments', (req, res) => {
  res.json([
    { course: 'Math', assignment: 'Algebra Worksheet', due: '2025-06-20' },
    { course: 'Science', assignment: 'Lab Report', due: '2025-06-22' }
  ]);
});

module.exports = router;
module.exports.getLocalTutorAnswer = getLocalTutorAnswer;
