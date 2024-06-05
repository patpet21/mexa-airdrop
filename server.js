const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying another port...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

// Serve static files from the 'airdrop-main' directory
app.use(express.static(path.join(__dirname, 'airdrop-main')));

// Handle client-side routing, return all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'airdrop-main', 'index.html'));
});

startServer(PORT);

