const path = require ('path');
const fs = require ('fs');
const mocker = {};

if (process.env.NODE_ENV === 'development') {
  fs.readdirSync (path.join (`${__dirname}`)).forEach (function (file) {
    if (file !== 'index.js') {
      let content = require (path.join (__dirname, file));
      Object.assign (mocker, content);
    }
  });
}
module.exports = mocker;
