const http = require('http');

const server = http.createServer((req, res) => {

  server.listen(PORT, () =>{
    console.log('server is listening on port', PORT);
  });
});