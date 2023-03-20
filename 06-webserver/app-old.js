import http from 'http';
console.clear();
const proxy = http
  .createServer((req, res) => {
    console.log(req.headers);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Hola mundo \n');
    res.end('okay');
  })
  .listen(8080);
console.log('Server running');
