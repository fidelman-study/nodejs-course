// // kill me in 10 seconds
// const timer = setTimeout(function() {
//   console.log("done");
// }, 10000);
//
// // при добавлении этой строки выход будет тут же
// timer.unref();

const {Server} = require('http');

const server1 = new Server((req, res) => {
  if (req.url === '/shutdown') {
    server1.close(() => console.log('close'));
    res.end('bye');
    return;
  }

  res.end("Hello");

});

server1.listen(8000);

const server2 = new Server((req, res) => {
  res.end(JSON.stringify(process.memoryUsage()));
});

server2.listen(8080);

server2.unref();
