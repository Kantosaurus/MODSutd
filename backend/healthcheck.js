const http = require('http');

const options = {
  host: 'localhost',
  port: process.env.PORT || 4000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function(err) {
  console.log('HEALTHCHECK ERROR', err);
  process.exit(1);
});

request.end();