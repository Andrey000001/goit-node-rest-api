const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const nanoid = require('nanoid');
const contactsRouter = require('./routes/api/contactsRoute');
const authRouter = require('./routes/api/userAuth');

const tempDir = path.join(__dirname, 'src', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

const dataAvatars = [];
const avatarDir = path.join(__dirname, 'src', 'public', 'avatars');

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.get('/api/avatars', (req, res) => {
  res.status(200).json(dataAvatars);
});

app.post('/api/avatars', upload.single('cover'), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);

  await fs.rename(tempUpload, resultUpload);
  const cover = path.join('avatars', originalname);
  const newContact = {
    id: nanoid.nanoid(),
    title: req.body.title,
    cover,
  };
  dataAvatars.push(newContact);
  res.status(201).json(newContact);
});
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
