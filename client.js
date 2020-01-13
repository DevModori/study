var http = require('http');

var options = {
    host: '127.0.0.1',
    port: '8081',
    path: '/index.html'
};

var callback = function(reponse) {
    var body = '';
    // response 이벤트 감지, data를 받아 온다.
    reponse.on('data', function(abc) {
        body += abc;
    });

    // response end 감지되면...
    reponse.on('end', function() {
        console.log(body);
    });
}

var req = http.request(options, callback);
req.end();