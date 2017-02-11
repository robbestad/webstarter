const http = require('http');
const app = require('./app');

http.createServer(app.callback()).listen(process.env.PORT || 1997);

//eslint-disable-next-line no-console
console.log("Started webserver on http://localhost:" + (process.env.PORT || 1997));
