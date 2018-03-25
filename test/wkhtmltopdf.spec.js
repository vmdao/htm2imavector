var Path = require('path'),
  Fs = require('fs'),
  Express = require('express'),
  Rimraf = require('rimraf'),
  Mkdirp = require('mkdirp'),
  { expect } = require('chai'),
  { html2pdf } = require('..');

describe('html2pdf', function () {

  var fixturesDir = Path.join(__dirname, 'fixtures'),
    resultsDir = Path.join(__dirname, 'results'),
    expectedDir = Path.join(__dirname, 'expected');

  function fixturePath(name) { return Path.join(fixturesDir, name); }
  function resultPath(name) { return Path.join(resultsDir, name); }
  function expectedPath(name) { return Path.join(expectedDir, name); }

  function checkResults(resultsName, expectedName) {
    expect(Fs.statSync(resultPath(resultsName)).size).toBeGreaterThan(0);
  }
  // Return a file URL we can use to access a fixture
  function fixtureFileUri(fixtureName) {
    return 'file:///' + Path.join(fixturesDir, fixtureName).replace(/\\/g, '/');
  }


  // Prepare the results directory
  before(function () {
    Rimraf.sync(resultsDir);
    Mkdirp.sync(resultsDir);
    console.log('[Info] Test cases only check that the output .pdf contains some data, manual inspection is needed');
    console.log('[Info] Please inspect the expected and results directory after the tests');
  });

  context('when input starts with file://', function () {
    it('should treat input as file path', function (done) {
      var output = Fs.createWriteStream(resultPath('fileUrlSpec.pdf'));
      html2pdf(fixtureFileUri('validFile.html')).pipe(output);
      output.on('finish', function () {
        checkResults('fileUrlSpec.pdf', 'validFile.pdf');
        done();
      });
    });
  });

  context('when input starts with http://', function () {
    var server;

    // Return the HTTP URL we can use to access a fixture with our dummy server
    function fixtureHttpUrl(fixtureName) {
      var port = server.address().port;
      return 'http://localhost:' + port + '/' + fixtureName;
    }

    // Create a dummy server that serves the fixtures directory
    before(function (done) {
      var app = Express();
      app.use(Express.static(fixturesDir));
      server = app.listen(0, 'localhost', done);
    });

    it('should treat input as url', function (done) {
      var output = Fs.createWriteStream(resultPath('httpUrlSpec.pdf'));
      html2pdf(fixtureHttpUrl('validFile.html')).pipe(output);
      output.on('finish', function () {
        checkResults('httpUrlSpec.pdf', 'validFile.pdf');
        done();
      });
    });

    after(function () {
      server.close();
    });
  });

  context('when input is an html', function () {
    it('should use it as the source', function (done) {
      var output = Fs.createWriteStream(resultPath('htmlSourceSpec.pdf'));
      html2pdf(Fs.readFileSync(fixturePath('validFile.html'), 'utf8')).pipe(output);
      output.on('finish', function () {
        checkResults('htmlSourceSpec.pdf', 'validFile.pdf');
        done();
      });
    });
  });

  context('when input is a stream', function () {
    it('should use it as the source', function (done) {
      html2pdf(Fs.createReadStream(fixturePath('validFile.html')), function (err) {
        expect(err).to.be.null;
        checkResults('streamSourceSpec.pdf', 'validFile.pdf');
        done();
      }).pipe(Fs.createWriteStream(resultPath('streamSourceSpec.pdf')));
    });
  });

  context('when callback is used', function () {
    it('should return a readable stream', function (done) {
      html2pdf(Fs.createReadStream(fixturePath('validFile.html')), function (err, stream) {
        expect(err).to.be.null;
        var output = Fs.createWriteStream(resultPath('callbackStream.pdf'))
        stream.pipe(output);
        output.on('finish', function () {
          checkResults('callbackStream.pdf', 'validFile.pdf');
          done();
        });
      });
    });
  });

});

