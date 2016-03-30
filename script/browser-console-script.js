function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open('GET', theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function makeCalls(num, instanceDnsName) {
  if (num > 0) {
    setTimeout(function() {
      httpGetAsync('http://' + instanceDnsName + '/stress.php',
        function(text) {
          console.log(num + ' ' + text.match(/page generated in \d+(\.\d+)* seconds/i)[0]);
        }
      );
      num--;
      makeCalls(num, instanceDnsName);
    }, 1000);
  }
}

// usage:
// makeCalls(100, 'ec2-11-22-33-44.eu-west-1.compute.amazonaws.com');
