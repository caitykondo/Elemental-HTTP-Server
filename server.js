const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const resourceMapping = {
  'index' : './index.html',
  '404' : './404.html',
  'helium' : './helium.html',
  'hydrogen' : './hydrogen.html'
};

const fileNotFoundErrorHandler = (res) => {
  res.statusCode = 500;
  res.end('Server is broken');
};

const sendContent = (res, content) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(content);
  res.end();
};


const server = http.createServer((req, res) => {
  console.log(req.method);

  // GET method
  if(req.method === 'GET'){

    // for hardcoded files
    if(req.url === '/helium'){

      fs.readFile('./public/helium.html', (err, content) => {
        if( err ){
          fileNotFoundErrorHandler(res);
          return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write(content);
        res.end();
        return
      });
    }
  }
});

server.listen(PORT, () =>{
  console.log('server is listening on port', PORT);
});