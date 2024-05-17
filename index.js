import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import { UserController, PostController, BookController } from './controllers/index.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
  .connect(process.env.MONGODB_CONNECT_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB err', err));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4444;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'images');
  },
  filename: (_, file, cb) => {
    cb(null, file.fieldname + _ + Date.now());
  },
});

const upload = multer({ storage });

app.get('/images/', upload.single('avatar'), (req, res) => {
  res.send('File uploaded successfully');
});

app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/book/:id', BookController.getBook);
app.get('/chapter/:id', BookController.getChapter);

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
});

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
