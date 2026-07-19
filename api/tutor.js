const { getTutorAnswer } = require('./_tutor');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const question = String(req.body?.question || req.body?.prompt || '').trim();
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  return res.status(200).json({ answer: await getTutorAnswer(question) });
};
