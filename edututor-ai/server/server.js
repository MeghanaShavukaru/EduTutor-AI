const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Config
app.use(session({
  secret: 'edututor-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api', require('./routes/api.js'));
app.use('/dashboard', require('./routes/dashboard.js'));
app.use('/courses', require('./routes/courses.js'));
app.use('/contact', require('./routes/contact.js'));

// Dummy fallback EJS route
app.get('/', (req, res) => {
  res.render('pages/fallback', { title: 'EduTutor AI Backend' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ EduTutor Backend running at http://localhost:${PORT}`);
});
