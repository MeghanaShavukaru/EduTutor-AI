const express = require('express');
const router = express.Router();

const assignments = {
  react: {
    title: "React.js Assignment",
    description: "Build a component-based to-do app",
    dueDate: "2025-06-25",
    module: "JSX, Components, Props, State"
  },
  python: {
    title: "Python Assignment",
    description: "Create a CLI calculator",
    dueDate: "2025-06-25",
    module: "Basics, Loops, Functions"
  },
  ai: {
    title: "AI Prompt Assignment",
    description: "Design prompts for various use-cases",
    dueDate: "2025-06-25",
    module: "Prompting, Zero-shot, Few-shot"
  },
  tailwind: {
    title: "Tailwind CSS Assignment",
    description: "Clone a landing page with Tailwind",
    dueDate: "2025-06-25",
    module: "Utility-first, Layout, Theme"
  }
};

router.get('/assignments/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const data = assignments[courseId];
  if (!data) return res.status(404).json({ error: "Assignment not found" });
  res.json(data);
});

module.exports = router;
