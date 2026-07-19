import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssignments } from '../utils/api';

// This page renders assignments + quizzes.
// Assignments are loaded from backend (getAssignments).

const SAMPLE_CONTENT = {
  python: {
    assignments: [
      {
        title: 'Python Worksheet: Variables & Types',
        due: 'No due date',
        description:
          'Answer the prompts below. When done, submit to see instant feedback.'
      },
      {
        title: 'Python Practice: Loops',
        due: 'No due date',
        description:
          'Write short loop examples and test yourself against the quiz.'
      }
    ],
    quizzes: [
      {
        id: 'py-quiz-1',
        title: 'Quiz 1: Variables & Output',
        questions: [
          {
            id: 'q1',
            prompt: 'What does the print() function do in Python?',
            options: [
              'Stores data in memory',
              'Displays output to the console',
              'Compiles Python code',
              'Creates a new variable type'
            ],
            correctIndex: 1,
            explanation: 'print() sends text/value to the console (standard output).'
          },
          {
            id: 'q2',
            prompt: 'Which symbol is commonly used to define comments?',
            options: ['#', '//', '/* */', '--'],
            correctIndex: 0,
            explanation: 'In Python, single-line comments start with #.'
          },
          {
            id: 'q3',
            prompt: 'True or False: Python variables can store different data types.',
            options: ['True', 'False'],
            correctIndex: 0,
            explanation: 'Python is dynamically typed, so values determine the type.'
          }
        ]
      },
      {
        id: 'py-quiz-2',
        title: 'Quiz 2: Loops Basics',
        questions: [
          {
            id: 'q1',
            prompt: 'What is the purpose of a loop?',
            options: [
              'To execute code repeatedly',
              'To define functions only',
              'To stop the program immediately',
              'To import libraries'
            ],
            correctIndex: 0,
            explanation: 'Loops repeat a block of code for multiple iterations.'
          }
        ]
      }
    ]
  },
  react: {
    assignments: [
      {
        title: 'React Mini Task: Build a Component',
        due: 'No due date',
        description:
          'Create a component that shows a title and a button. Update text when the button is clicked.'
      }
    ],
    quizzes: [
      {
        id: 're-quiz-1',
        title: 'Quiz: Components & Props',
        questions: [
          {
            id: 'q1',
            prompt: 'Components in React are used to...',
            options: [
              'Run server-side scripts',
              'Build reusable UI pieces',
              'Replace JavaScript',
              'Only store CSS'
            ],
            correctIndex: 1,
            explanation: 'React components are the reusable building blocks of UI.'
          },
          {
            id: 'q2',
            prompt: 'Props are...',
            options: [
              'Values passed from parent to child',
              "Internal state that can’t change",
              'CSS classes',
              'Database queries'
            ],
            correctIndex: 0,
            explanation: 'Props let components share data.'
          }
        ]
      }
    ]
  }
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function InteractiveAssignment() {
  const { course } = useParams();
  const navigate = useNavigate();

  const normalizedCourse = (course || '').toLowerCase();

  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [backendAssignments, setBackendAssignments] = useState([]);

  const content = SAMPLE_CONTENT[normalizedCourse] || SAMPLE_CONTENT.python;

  const [activeQuizId, setActiveQuizId] = useState(content.quizzes?.[0]?.id || '');
  const activeQuiz = useMemo(
    () => content.quizzes.find((q) => q.id === activeQuizId) || content.quizzes[0],
    [content.quizzes, activeQuizId]
  );

  const [answers, setAnswers] = useState({}); // {questionId: selectedIndex}
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset when course changes.
    setActiveQuizId(content.quizzes?.[0]?.id || '');
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }, [normalizedCourse, content.quizzes]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingAssignments(true);
      const assignments = await getAssignments();
      if (cancelled) return;
      setBackendAssignments(Array.isArray(assignments) ? assignments : []);
      setLoadingAssignments(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalQuestions = activeQuiz?.questions?.length || 0;
  const progress = totalQuestions ? clamp(Object.keys(answers).length / totalQuestions, 0, 1) : 0;

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    const qList = activeQuiz.questions;
    let correct = 0;
    for (const q of qList) {
      const selected = answers[q.id];
      if (selected === q.correctIndex) correct += 1;
    }
    setScore(correct);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleStartAssignment = (assignmentTitle) => {
    void assignmentTitle;
    // Simple interactive flow: focus the user on answering in textarea.
    const el = document.getElementById('assignment-work');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#0d0d1f] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">{normalizedCourse || 'course'} Assignments + Quizzes</h1>
            <p className="text-gray-300 mt-2">Interactive practice with instant feedback.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border border-pink-500 text-pink-200 hover:bg-pink-500/10"
          >
            Go Back
          </button>
        </div>

        {/* Assignments */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-pink-300 mb-4">Assignments</h2>

          {loadingAssignments ? (
            <div className="text-gray-300">Loading assignments...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {(
                  backendAssignments.length
                    ? backendAssignments
                        .filter((x) => (normalizedCourse ? (x.course || '').toLowerCase() === normalizedCourse : true))
                        .map((a) => ({
                          title: a.assignment || a.title || 'Assignment',
                          due: a.due || 'No due date',
                          description: `Practice: ${a.assignment || a.title || ''}`
                        }))
                    : content.assignments
                ).map((a) => (
                  <div key={a.title} className="bg-[#222] border border-pink-500/40 rounded-lg p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">{a.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">Due: {a.due}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-pink-600/20 text-pink-200">Practice</span>
                    </div>
                    <p className="text-gray-200 mt-3">{a.description}</p>
                    <button
                      onClick={() => handleStartAssignment(a.title)}
                      className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>

              <div
                id="assignment-work"
                className="mt-6 bg-[#111827]/40 border border-pink-500/30 rounded-xl p-5"
              >
                <h3 className="text-xl font-semibold">Your Work</h3>
                <p className="text-gray-300 mt-2">
                  Paste your solution below (or add notes). Then take a quiz for instant feedback.
                </p>
                <textarea
                  className="mt-4 w-full bg-black/30 text-white border border-gray-700 rounded p-3"
                  rows={6}
                  placeholder="Write your answer here..."
                />
              </div>
            </>
          )}
        </section>

        {/* Quizzes */}
        <section className="bg-[#111827]/30 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-green-300">Quizzes</h2>
              <p className="text-gray-300 mt-2">Pick a quiz, answer, and submit to see score.</p>
            </div>

            <div className="w-44">
              <div className="text-xs text-gray-400">Progress</div>
              <div className="mt-2 h-2 bg-gray-700 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <div className="text-sm text-gray-200 mt-2">{Math.round(progress * 100)}%</div>
            </div>
          </div>

          {/* Quiz selector */}
          <div className="mt-5 flex flex-col md:flex-row md:items-center gap-3">
            <label className="text-sm text-gray-300">Choose quiz:</label>
            <div className="flex gap-2 flex-wrap">
              {content.quizzes.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuizId(q.id);
                    setAnswers({});
                    setSubmitted(false);
                    setScore(0);
                  }}
                  className={
                    'px-3 py-2 rounded border text-sm ' +
                    (q.id === activeQuizId
                      ? 'bg-green-500/20 border-green-500 text-green-200'
                      : 'bg-transparent border-gray-700 text-gray-200 hover:bg-white/5')
                  }
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>

          {activeQuiz && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">{activeQuiz.title}</h3>

              <div className="mt-4 space-y-4">
                {activeQuiz.questions.map((q, idx) => {
                  const selected = answers[q.id];
                  const showCorrect = submitted;

                  return (
                    <div key={q.id} className="bg-black/20 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">Q{idx + 1}</div>
                          <div className="text-white font-semibold mt-1">{q.prompt}</div>
                        </div>
                        {showCorrect && (
                          <div
                            className={
                              'text-sm font-semibold ' +
                              (selected === q.correctIndex ? 'text-green-300' : 'text-red-300')
                            }
                          >
                            {selected === q.correctIndex ? 'Correct' : 'Wrong'}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 grid gap-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selected === optIndex;
                          const isCorrect = optIndex === q.correctIndex;

                          let className =
                            'px-3 py-2 rounded border text-sm text-gray-100 bg-black/30 hover:bg-white/5';

                          if (submitted) {
                            if (isCorrect) className += ' border-green-400 bg-green-400/10';
                            else if (isSelected && !isCorrect) className += ' border-red-400 bg-red-400/10';
                          } else {
                            if (isSelected) className += ' border-green-400 bg-green-400/10';
                            else className += ' border-gray-700';
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelect(q.id, optIndex)}
                              className={className}
                              disabled={submitted}
                            >
                              <span className="mr-2 text-gray-400">{String.fromCharCode(65 + optIndex)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 text-sm text-gray-200">
                          <span className="text-gray-400">Explanation:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div>
                  {!submitted ? (
                    <div className="text-sm text-gray-300">
                      Answer all questions, then click{' '}
                      <span className="text-pink-200 font-semibold">Submit Quiz</span>.
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-green-300">
                      Your score: {score}/{totalQuestions}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {!submitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded disabled:opacity-50"
                      disabled={Object.keys(answers).length < totalQuestions}
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleRetake}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded"
                    >
                      Retake
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

