var express = require('express');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var leasesParser = require('./modules/leasesParser');

var leaseFilePath = '/var/lib/dhcp/dhcpd.lease';
var inactive = false;
var hostname = 'localhost';
var port = '8080';

if (argv.i || argv.inactive) {
  if (argv.i === true || argv.inactive === true) {
    inactive = true;
  } else {
    console.error('Are you sure you want to show inactives?');
  }
}

if (argv.l || argv.leaseFile) {
  if ((argv.l && argv.l !== true) ||
      (argv.leaseFile && argv.leaseFile !== true)) {
    leaseFilePath = argv.l || argv.leaseFile;
  } else {
    console.error('Incorrect path to lease file');
  }
}

if (argv.h || argv.hostname) {
  if ((argv.h && argv.h !== true) ||
      (argv.hostname && argv.hostname !== true)) {
    hostname = (argv.h || argv.hostname).split(':');
    port = hostname[1] || 8080;
    hostname = hostname[0];
  } else {
    console.error('Incorrect hostname');
  }
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

var server = app.listen(port, hostname, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
