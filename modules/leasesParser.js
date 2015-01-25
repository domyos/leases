var fs = require('fs');

var getLeasesFromFile = function(leaseFilePath, callback) {
  fs.readFile(leaseFilePath, function(err, file) {
    var leases = [];
    if (err) {
      console.error(err);
    } else {
      var leaseStrings = parseLeases(file.toString());
      leaseStrings.forEach(function(leaseString) {
        leases.push(parseLease(leaseString));
      });
      callback(null, leases);
    }
  });
};

var parseLeases = function(file) {
  var leaseRegEx =
    /lease [0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3} \{(.|\n)+?\}/gm;
  var result = file.match(leaseRegEx);
  return result;
};

var parseLease = function(leaseString) {
  var lease = {};

  lease.ip = parseIp(leaseString);
  lease.starts = getLocaleDateString(parseStarts(leaseString));
  lease.ends = getLocaleDateString(parseEnds(leaseString));
  lease.tstp = getLocaleDateString(parseTstp(leaseString));
  lease.cltt = getLocaleDateString(parseCltt(leaseString));
  lease.bindingState = parseBindingState(leaseString);
  lease.nextBindingState = parseNextBindingState(leaseString);
  lease.rewindBindingState = parseRewindBindingState(leaseString);
  lease.hardwareEthernet = parseHardwareEthernet(leaseString);
  lease.uid = parseUid(leaseString);
  lease.clientHostname = parseClientHostname(leaseString);

  return lease;
};

var parseIp = function(leaseString) {
  var ipRegEx = /lease ([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})/;
  var result = leaseString.match(ipRegEx);
  return result ? result[1] : undefined;
};

var parseStarts = function(leaseString) {
  var startsRegEx = /starts (.+);/;
  var result = leaseString.match(startsRegEx);
  return result ? result[1] : undefined;
};

var parseEnds = function(leaseString) {
  var endsRegEx = /ends (.+);/;
  var result = leaseString.match(endsRegEx);
  return result ? result[1] : undefined;
};

var parseTstp = function(leaseString) {
  var tstpRegEx = /tstp (.+);/;
  var result = leaseString.match(tstpRegEx);
  return result ? result[1] : undefined;
};

var parseCltt = function(leaseString) {
  var clttRegEx = /cltt (.+);/;
  var result = leaseString.match(clttRegEx);
  return result ? result[1] : undefined;
};

var parseBindingState = function(leaseString) {
  var bindingStateRegEx = /binding state (.+);/;
  var result = leaseString.match(bindingStateRegEx);
  return result ? result[1] : undefined;
};

var parseNextBindingState = function(leaseString) {
  var nextBindingStateRegEx = /next binding state (.+);/;
  var result = leaseString.match(nextBindingStateRegEx);
  return result ? result[1] : undefined;
};

var parseRewindBindingState = function(leaseString) {
  var rewindBindingStateRegEx = /rewind binding state (.+);/;
  var result = leaseString.match(rewindBindingStateRegEx);
  return result ? result[1] : undefined;
};

var parseHardwareEthernet = function(leaseString) {
  var hardwareEthernetRegEx = /hardware ethernet (.+);/;
  var result = leaseString.match(hardwareEthernetRegEx);
  return result ? result[1] : undefined;
};

var parseUid = function(leaseString) {
  var uidRegEx = /uid "(.+)";/;
  var result = leaseString.match(uidRegEx);
  return result ? result[1] : undefined;
};

var parseClientHostname = function(leaseString) {
  var clientHostnameRegEx = /client-hostname "(.+)";/;
  var result = leaseString.match(clientHostnameRegEx);
  return result ? result[1] : undefined;
};

var getLocaleDateString = function(dateString) {
  var dateRegEx = /(.+)(GMT\+[0-9]{4}) (\(CES?T\))/;
  if (dateString) {
    var localeString = new Date(dateString.substr(2)).toLocaleString();
    return localeString.replace(dateRegEx, '$1 $3');
  }
};

module.exports = {
  'getLeasesFromFile': getLeasesFromFile,
  'parseLeases': parseLeases,
  'parseLease': parseLease
};
