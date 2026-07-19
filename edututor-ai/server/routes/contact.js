const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log('📥 Contact form submitted:', { name, email, message });
  res.send('Thank you for contacting us!');
});

module.exports = router;
