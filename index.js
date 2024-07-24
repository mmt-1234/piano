const express = require('express');
const youtubedl = require('youtube-dl-exec');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html')
  res.sendFile(filePath);
})

app.get('/download', async (req, res) => {
  const url = req.query.url;
  console.log(url);
  const outputPath = path.join(__dirname, 'downloads');

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  try {
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: `gameplay`
    });
    res.status(200).send('Audio downloaded successfully');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(port, '0.0.0.0');
