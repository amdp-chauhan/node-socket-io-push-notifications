const app = require('./app');
const http = require('http');
const storage = require('node-persist');

/**
 * Persistent store creation
 */
storage.init({
    dir: './scripts/node-store',
    expiredInterval: 24 * 60 * 60 * 1000 //1 days
});

/**
 * Creating global SocketIo connection instance 
 */
var ioProm  = require('express-socket.io');
var server  = ioProm.init(app);

/**
 * Litening app on 3000 PORT
 */
server.listen(3000);

/**
 * Event for server error log
 */
server.on('error', error => console.log("Server Startup Error - ",error));

/**
 * Listening server
 */
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    console.log("Server listening on ",bind)
});












// subscribers.forEach((subscriber) => {
//     PushNotification.createSocketConnection(subscriber, io);
// });