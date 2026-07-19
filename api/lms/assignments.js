module.exports = (req, res) => {
  res.status(200).json([
    { course: 'Math', assignment: 'Algebra Worksheet', due: '2025-06-20' },
    { course: 'Science', assignment: 'Lab Report', due: '2025-06-22' }
  ]);
};
