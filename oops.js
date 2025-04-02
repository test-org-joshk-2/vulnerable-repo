const { exec } = require('child_process');
const http = require('http');

// Create an HTTP server
http.createServer((req, res) => {
  // Extract the 'name' query parameter from the URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const name = url.searchParams.get('name');

  // Vulnerable code: directly using user input in a command
  exec(`echo Hello, ${name}`, (error, stdout, stderr) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: ${stderr}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(stdout);
  });
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
