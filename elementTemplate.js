module.exports = function(reqObj){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Elements - ${reqObj.elementName}</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>${reqObj.elementName}</h1>
    <h2>${reqObj.elementSymbol}</h2>
    <h3>Atomic number ${reqObj.elementAtomicNumber}</h3>
    <p>${reqObj.elementDescription}</p>
    <p><a href="/">back</a></p>
  </body>
  </html>`;
};