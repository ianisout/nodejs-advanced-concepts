const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hello there');
  });
});

app.get('/fast', (req, res) => {
  res.send('This was fast');
});

app.listen(3000);

// $ pm2 start index.js -i 0

// -i: letting pm2 create instances for you
// 0: letting pm2 figure out what to do
// usually sets up # of instances = # logical CPU cores on your computer

// $ pm2 delete index

// $ pm2 list
// gets health of running clusters

// $ pm2 show <name>
// detail about each

// $ pm2 monit
