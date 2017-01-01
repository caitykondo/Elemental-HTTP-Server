const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const elementTemplate = require('./elementTemplate');

const PORT = process.env.PORT || 3000;

const fileNotFoundErrorHandler = (res) => {
  res.statusCode = 500;
  res.end('Server is broken');
};

// const sendContent = (res, content) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.write(content);
//   res.end();
// };


const server = http.createServer((req, res) => {
  req.setEncoding('utf8');



  // POST methods

  // should give a route to write the new element to
  // this is a new html file in the public directory
  // console.log(req.url);
  if(req.method === 'POST'){
      // can extract info from body AND write to template
    req.on('data', (chunk) => {
      // extracts new file name from request header
      let fileArr = req.url.split('');
      fileArr.splice(0, 1 );
      let fileName = fileArr.join('');

      // turns body into an object
      let reqObj = qs.parse(chunk);

      // writes new file
      fs.writeFile(`public/${fileName}.html`, elementTemplate(reqObj), (err) => {
        if(err){
          console.log('do nothing');
        }else{
          console.log('worked');
        }
      });
      res.end();


    });



    // creates new file in public directory / rewrites existing ones
  }

  // should contain a content type of `application/x-www-form-urlencoded`
  // parse the body
  // create a new HTML file based on a specific HTML template
  // the server responds with code 200, content-type application/json and content body of {'success': true}

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