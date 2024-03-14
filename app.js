const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');

const app = express();
const db = new sqlite3.Database('urls.db');

// Create the URLs table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_url TEXT UNIQUE,
  long_url TEXT
)`);

app.use(express.urlencoded({ extended: true }));

// Serve the HTML form for URL shortening
app.get('/', (req, res) => {
  res.send(`
    <h1>URL Shortener</h1>
    <form action="/shorten" method="POST">
      <input type="text" name="longUrl" placeholder="Enter a long URL">
      <button type="submit">Shorten</button>
    </form>
  `);
});

// Handle the URL shortening request
app.post('/shorten', (req, res) => {
  const longUrl = req.body.longUrl;
  const shortUrl = shortid.generate();

  db.run(`INSERT INTO urls (short_url, long_url) VALUES (?, ?)`, [shortUrl, longUrl], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error shortening URL');
    } else {
      res.send(`
        <h1>URL Shortened</h1>
        <p>Short URL: <a href="/${shortUrl}">${req.headers.host}/${shortUrl}</a></p>
        <p>Long URL: ${longUrl}</p>
      `);
    }
  });
});

// Handle the short URL redirection
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  db.get(`SELECT long_url FROM urls WHERE short_url = ?`, [shortUrl], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving URL');
    } else if (row) {
      res.redirect(row.long_url);
    } else {
      res.status(404).send('URL not found');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('URL shortener server is running on port 3000');
});