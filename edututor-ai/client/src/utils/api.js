const API_BASE = 'http://localhost:5000/api';

export const askTutor = async (question) => {
  try {
    const res = await fetch(`${API_BASE}/tutor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    return data.answer;
  } catch (error) {
    console.error('Tutor API error:', error);
    return '❌ Unable to get response from AI.';
  }
};

export const getAssignments = async () => {
  try {
    const res = await fetch(`${API_BASE}/lms/assignments`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('LMS API error:', error);
    return [];
  }
};
