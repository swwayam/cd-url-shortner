const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');

const app = express();
const db = new sqlite3.Database('urls.db');

// TODO: Create the URLs table if it doesn't exist
// - Use db.run() to execute the SQL statement
// - The table should have the following columns:
//   - id: INTEGER PRIMARY KEY AUTOINCREMENT
//   - short_url: TEXT UNIQUE
//   - long_url: TEXT


// TODO: Configure Express to parse URL-encoded request bodies
// - Use app.use(express.urlencoded({ extended: true }))

// TODO: Implement the route for serving the HTML form for URL shortening || Already Done For You
// - Use app.get() to handle GET requests to the root URL ('/')
// - Send an HTML response with a form that allows users to enter a long URL and submit it for shortening
app.get('/', (req, res) => {
  res.send(`
    <h1>URL Shortener</h1>
    <form action="/shorten" method="POST">
      <input type="text" name="longUrl" placeholder="Enter a long URL">
      <button type="submit">Shorten</button>
    </form>
  `);
});


// TODO: Implement the route for handling the URL shortening request
// - Use app.post() to handle POST requests to the '/shorten' URL
// - Extract the long URL from the request body
// - Generate a unique short URL using the shortid library
// - Insert the short URL and long URL pair into the urls table in the database
// - Send an HTML response with the shortened URL and the original long URL

// Use - send the following HTMl response -> 

/**
 <h1>URL Shortened</h1>
        <p>Short URL: <a href="/${shortUrl}">${req.headers.host}/${shortUrl}</a></p>
        <p>Long URL: ${longUrl}</p>
**/


// TODO: Implement the route for handling short URL redirection
// - Use app.get() to handle GET requests to URLs with a short URL parameter (e.g., '/:shortUrl')
// - Extract the short URL from the request parameters
// - Retrieve the corresponding long URL from the urls table in the database based on the short URL
// - If a matching long URL is found, redirect the user to that URL using res.redirect()
// - If no matching long URL is found, send a 404 error response indicating that the URL was not found



// TODO: Start the server
// - Use app.listen() to start the server and specify the port number to listen on 1337
// - Add a callback function to log a message when the server starts running
app.listen(1337, () => {
  console.log('URL shortener server is running on port 1337');
});




/*******************
 * 
 * 
 * Do Not Change Any Code Below This Line.
 * 
 * 
 ********************/


app.get('/isDatabaseAsExpected', async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="urls"', (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });

  res.status(200).send(result);
});