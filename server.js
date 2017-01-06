const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const elementTemplate = require('./elementTemplate');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  req.setEncoding('utf8');
    console.log(req.method);

    if(req.method === 'POST'){
      req.on('data', (chunk) => {

        // extracts new file name from request header
        let fileArr = req.url.split('');
        fileArr.splice(0, 1);
        let fileName = fileArr.join('');

        // returns body into an object
        let reqObj = qs.parse(chunk);


      // check that file doesnt already exist
        fs.open(`public/${fileName}.html`, 'wx', (err, reqObj) => {
          if (err){
              console.log('HAII');
            res.statusCode = 500;
            res.end('File already exists!');
          }else{
            // can extract info from body AND write to template
            fs.writeFile(`public/${fileName}.html`, elementTemplate(reqObj), (err) => {
              if(err){
                res.statusCode = 500;
                res.end('Server is broken');

              }else{
                res.statusCode = 200;
                res.end('{"success" : true}');
              }
            });
          }
        });
      });
    }
    else if(req.method === 'GET'){

      // extracts new file name from request header
      let fileArr = req.url.split('');
      fileArr.splice(0, 1);
      let fileName = fileArr.join('');
      // check if requested page exists in public dir & return page
      fs.open(`public/${fileName}.html`, 'r', (err, reqObj) => {
        if (err) {
          console.log('ERROR');
          res.statusCode = 404;
          res.end('No file with that name!');
        } else {
            fs.readFile(`public/${fileName}.html`, 'utf-8', elementTemplate(reqObj), (err, content) => {
              if(err){
              res.statusCode = 404;
              res.end('Nothing is here.');
            }else{
              console.log(content);
              res.statusCode = 200;
              res.write(content);
              res.end('elementTemplate(reqObj)');
            }
          });
            // console.log('HAII');
            // res.statusCode = 500;
            // res.end('File already exists!');
          }
      });
            // return the file: set the header and the html file as the body

       // });
          // if not return 404
        res.end();
      }


// REMEMBER TO ADD NEW PAGES TO INDEX.HTML

  // GET method
  // else if(req.method === 'GET'){
    // console.log(fileName);
    // for hardcoded files
    // if(req.url === '/helium'){

    //   fs.readFile('./public/helium.html', (err, content) => {
    //     if( err ){
    //       fileNotFoundErrorHandler(res);
    //       return;
    //     }
    //     res.setHeader('Content-Type', 'text/html');
    //     res.write(content);
    //     res.end();
    //     return
    //   });
    // }
  // }
});

server.listen(PORT, () =>{
  console.log('server is listening on port', PORT);
});