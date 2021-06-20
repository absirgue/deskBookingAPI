const http = require('http');
const app = require('./app.js')

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port); //starts the server on the port, start lsitenning on the port and excecute whichever function we pass to create server

