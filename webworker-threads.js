// https://www.npmjs.com/package/webworker-threads

const express = require('express');
const app = express();
const { Worker } = require('webworker-threads');

app.get('/', (req, res) => {
  // using keyword function so 'this' makes reference
  // to the Worker itself and not the route handler

  const worker = new Worker(function () {
    this.onmessage = function () {
      // this area here is what will be invoked when
      // the application calls worker.postMessage();

      let counter = 0;
      while (counter < 1e9) { // 1e9 = 1,000,000,000
        counter++;
      }

        postMessage(counter);
    };
  });

  worker.onmessage = function (message) {
    console.log(message.data);
    res.send('' + message.data)
  };

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast');
});

app.listen(3000);
