const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const leaveRoutes = require('./routes/leave.route');
const financeRoutes = require('./routes/finance.route');

dotenv.config();
const app = express();

// DB connection
mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log('Database Connected!')
);

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', leaveRoutes);
app.use('/api/v1', financeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EIMS ' });
});

// error handler
app.use(function (err, req, res, next) {
  const status = res.statusCode || 500;
  res.json({ errorCode: status, message: err.message });
});

// 404 route
app.use(function (req, res, next) {
  res.status(404);
  res.json({ errorCode: 404, message: `Path not found: ${req.path}` });
});

// server initialization
app.listen(process.env.PORT, () => {
  console.log(`server is running: http://localhost:${process.env.PORT}`);
});
