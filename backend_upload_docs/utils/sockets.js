const { Server } = require('socket.io');

const SocketSingleton = (() => {
    this.configure = (server) => this.io = new Server(server)
    return this
})();

module.exports = SocketSingleton;