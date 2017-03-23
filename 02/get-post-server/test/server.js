const assert = require('assert');

const server = require('../server');
const request = require('request');
const fs = require('fs');
const path = require('path');

const sum = (a, b) => {
  return a + b;
};

describe('sum tests', () => {
  describe('sum of 2 numbers', () => {
    it('should returns 5', () => {
      assert.equal(sum(2, 3), 5);
    });
  });

  describe('sum of non-numbers', () => {
    // ...
  });
});

describe('server test suites', () => {
  let app;

  before(done => {
    app = server.listen(3000, done);
  });

  after(done => {
    app.close(done);
  });

  describe('GET', () => {
    it('should index.html', done => {
      /*
       1. run server +
       2. make request "GET /"
       3. wait response
       4. compare content-type, body
       */

      request('http://localhost:3000', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        assert.equal(response.headers['content-type'], 'text/html');

        done();
      });
    });

    it('should existing image', done => {
      request('http://localhost:3000/big.png', function(error, response, body) {
        assert.equal(response.headers['content-type'], 'image/png');
        done();
      });
    });

    it('should 404 if don\'t have the file', done => {
      request('http://localhost:3000/asdadasd', function(error, response, body) {
        assert.equal(response.statusCode, 404);
        done();
      });
    });
  });
});
