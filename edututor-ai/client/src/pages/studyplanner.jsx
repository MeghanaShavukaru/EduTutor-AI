import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function StudyPlanner() {
  const [form, setForm] = useState({ topic: '', goal: '', level: 'beginner', timeAvailable: '60 min/day' });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setPlan(data);
    } catch (error) {
      setPlan({ error: 'Unable to generate a plan right now.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c2a] px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-pink-400 font-semibold uppercase tracking-[0.3em]">AI for Social Impact</p>
          <h1 className="text-4xl font-bold mt-2">Study Planner for Underserved Learners</h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            This tool turns a learner’s goal into a simple, structured study plan so students with limited access to tutoring can still make progress.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-slate-900/70 p-6 rounded-2xl border border-neon/30">
          <input className="p-3 rounded text-black" placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} required />
          <input className="p-3 rounded text-black" placeholder="Goal" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} required />
          <select className="p-3 rounded text-black" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
          <input className="p-3 rounded text-black" placeholder="Time available" value={form.timeAvailable} onChange={(e) => setForm({ ...form, timeAvailable: e.target.value })} />
          <button type="submit" className="md:col-span-2 bg-green-500 hover:bg-green-600 px-4 py-3 rounded font-semibold">
            {loading ? 'Generating...' : 'Generate AI Study Plan'}
          </button>
        </form>

        {plan && !plan.error && (
          <div className="mt-8 bg-slate-900/70 border border-green-400 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-green-400">Personalized Plan</h2>
            <p className="mt-2 text-gray-300">{plan.summary}</p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Next Step</h3>
              <p className="mt-2 text-gray-200">{plan.nextAction}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Study Steps</h3>
              <ol className="mt-3 space-y-3">
                {plan.steps.map((step, index) => (
                  <li key={index} className="bg-black/40 p-3 rounded">
                    <div className="font-semibold">{index + 1}. {step.title}</div>
                    <div className="text-sm text-gray-300 mt-1">{step.detail}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {plan?.error && (
          <div className="mt-8 bg-red-950/60 border border-red-400 p-4 rounded">{plan.error}</div>
        )}
      </div>
    </div>
  );
}

export default StudyPlanner;
