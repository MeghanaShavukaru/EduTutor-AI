const { getLocalTutorAnswer } = require('../../../../routes/api');

async function getExternalTutorAnswer(question) {
  // Keep behavior consistent with routes/api.js
  const axios = require('axios');
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
            content:
              'You are an encouraging tutor for students learning coding and technology. Give concise, beginner-friendly answers with a small example when helpful.'
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

async function getTutorAnswer(question) {
  const externalAnswer = await getExternalTutorAnswer(question);
  if (externalAnswer) return externalAnswer;
  return getLocalTutorAnswer(question);
}

// Vercel Node serverless function (API Route)
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question = '', prompt = '' } = req.body || {};
    const q = (question || prompt || '').toString();

    if (!q.trim()) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const answer = await getTutorAnswer(q);
    return res.json({ answer });
  } catch (err) {
    console.error('tutor handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

