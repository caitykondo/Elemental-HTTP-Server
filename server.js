const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const elementTemplate = require('./elementTemplate');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  req.setEncoding('utf8');

  if(req.method === 'POST'){
    // check that file doesnt already exist

      // can extract info from body AND write to template
    req.on('data', (chunk) => {

      // extracts new file name from request header

      let fileArr = req.url.split('');
      fileArr.splice(0, 1);
      let fileName = fileArr.join('');

      // returns body into an object
      let reqObj = qs.parse(chunk);
      console.log(reqObj);

        fs.open(`public/${fileName}.html`, 'wx', (err, reqObj) => {
          if (err){
            res.statusCode = 500;
            res.end('File already exists!');
          }else{
            fs.writeFile(`public/${fileName}.html`, elementTemplate(reqObj), (err) => {
              if(err){
                res.statusCode = 500;
                res.end('Server is broken');
              }else{
                res.statusCode = 200;
                res.write('{"success" : true}');
                res.end();
              }
            });
          }
        });
    });
  }

  // GET method
  else if(req.method === 'GET'){

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