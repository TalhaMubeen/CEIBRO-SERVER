const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { webSocket } = require('./controllers');

// let server;
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');

    const welcome = (p) => () =>
      l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    global.io = io;

    server.listen(config.port || 3000, () => {
      logger.info(`Listening to port ${config.port}`);
    });

    // const conn = mongoose.connection;

    // global.mongooseConnection = conn;

    // conn.on('error', () => console.error('connection error'));

    // conn.once('open', () => logger.info('Connection to Database is successful'));

    webSocket.listenToChatServer(io);

    // server = app.listen(config.port, () => {
    //   logger.info(`Listening to port ${config.port}`);
    // });
  })
  .catch((err) => {
    console.log('error connnecting mongo');
  });
// let server
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
