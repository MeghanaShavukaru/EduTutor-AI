function getLocalTutorAnswer(question) {
  const text = question.toLowerCase().trim();

  if (text.includes('react') && text.includes('props')) {
    return 'Props are values passed from a parent component to a child component. They let components share data without changing their own internal state.';
  }
  if (text.includes('react') && text.includes('state')) {
    return 'In React, state is data that can change over time. When state updates, the UI re-renders so the user sees the latest values.';
  }
  if (text.includes('react')) {
    return 'React is a JavaScript library for building user interfaces. Its main ideas are components, props, state, and hooks.';
  }
  if (text.includes('python')) {
    return 'Python is a beginner-friendly language used for automation, data science, web development, and AI. Start with variables, loops, functions, lists, and conditionals.';
  }
  if (text.includes('javascript') || text.includes('js')) {
    return 'JavaScript makes web pages interactive. It helps with events, form handling, dynamic content, and communication with servers.';
  }
  if (text.includes('api')) {
    return 'An API is a way for one program to talk to another. Think of it like a menu: you make a request and receive the data you need.';
  }
  return 'That is a solid question. Think about what it is, why it matters, and one small practical example. Ask me for a beginner-friendly example if you would like one.';
}

async function getTutorAnswer(question) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return getLocalTutorAnswer(question);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an encouraging tutor for students learning coding and technology. Give concise, beginner-friendly answers with a small example when helpful.'
          },
          { role: 'user', content: question }
        ]
      })
    });

    if (!response.ok) throw new Error(`OpenAI returned ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || getLocalTutorAnswer(question);
  } catch (error) {
    console.error('Tutor AI request failed:', error.message);
    return getLocalTutorAnswer(question);
  }
}

module.exports = { getTutorAnswer };
