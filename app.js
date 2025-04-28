const express = require('express');
const cors = require('cors');

const app = express();

const contactsRouter = require('./routes/api/contactsRoute');
const authRouter = require('./routes/api/userAuth');

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
