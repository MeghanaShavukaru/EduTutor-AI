const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const courses = [
    { title: 'React.js', level: 'Intermediate' },
    { title: 'Web Dev Bootcamp', level: 'Beginner' },
    { title: 'DSA Mastery', level: 'Advanced' },
    { title: 'Python Basics', level: 'Beginner' }
  ];

  res.render('pages/fallback', {
    title: 'Courses',
    courses
  });
});

module.exports = router;
