var express = require('express');
var path = require('path');
var leasesParser = require('./modules/leasesParser');

var leaseFilePath = process.argv[2];
var inactive = process.argv[3] === '-i' || process.argv[3] === '--inactive';

if (!leaseFilePath) {
  console.error('Use: node app.js [path to lease file]');
  return;
}

var app = express();
app.use(express.static(path.join(__dirname + '/public')));

app.get('/api/leases', function(req, res) {
  leasesParser.getLeasesFromFile(leaseFilePath, function(err, leases) {
    if (inactive) {
      res.send(JSON.stringify(leases));
    } else {
      var activeLeases = leases.filter(function(lease) {
        return lease.bindingState === 'active';
      });

      res.send(JSON.stringify(activeLeases));
    }
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
