process.env.UV_THREADPOOL_SIZE = 1;
// increasing the threadpool size to match amount of cluster.fork
// works BUT NOT ALWAYS, it is not infinite

const cluster = require('cluster');

// console.log(cluster.isMaster);
// always set to true for Cluster Manager, never for Working Instances

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // I am a child, I m going to act like a server and do nothing else
  const crypto = require('crypto');
  const express = require('express');
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
}

// BENCHMARKING
// apache benchmark
// $ ab
// $ ab -c 50 -n 500 localhost:3000/fast
// -n: total number (500)
// -c: use a concurrency of 50
