require('dotenv').config();
require('babel-register')();
require('babel-polyfill');

const log = require('fancy-log');
const server = require('./server').default;

const port = process.env.PORT || 5000;
server.listen(port, () => log(`API server started on ${port}`));
