const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001; 

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'assets', 'songs'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('songFile'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
