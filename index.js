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

app.post('/download', async (req, res) => {
  const url = req.body.url;
  const outputPath = path.join(__dirname, 'downloads');

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
    res.send({murl:})
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
