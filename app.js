var express = require('express');
var path = require('path');
var leasesParser = require('./modules/leasesParser');

var leaseFilePath = '';
var inactive = false;

process.argv.forEach(function(param, index, array) {
  var inactiveRegEx = /(-i|--inactive)/;
  var leaseFileRegEx = /(-il|-l|--leaseFile)/;

  if (leaseFileRegEx.test(param)) {
    leaseFilePath = array[index + 1];
  }

  if (inactiveRegEx.test(param)) {
    inactive = true;
  }
});


if (!leaseFilePath) {
  console.error('Must define lease file');
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
