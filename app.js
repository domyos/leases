var express = require('express');
var path = require('path');
var leasesParser = require('./modules/leasesParser');

var leaseFilePath = process.argv[2];

if (!leaseFilePath) {
  console.error('Use: node app.js [path to lease file]');
  return;
}

var app = express();
app.use(express.static(path.join(__dirname + '/public')));

app.get('/api/leases', function(req, res) {
  leasesParser.getLeasesFromFile(leaseFilePath, function(err, leases) {
    res.send(JSON.stringify(leases));
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
