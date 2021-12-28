const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const http = require('http');
const socketIo = require('socket.io');
const { webSocket } = require('./controllers');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  const welcome = (p) => () =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

  const server = http.createServer(app)
  const io = socketIo(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
      
  webSocket.listenToChatServer(io)
  server.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });

  // server = app.listen(config.port, () => {
  //   logger.info(`Listening to port ${config.port}`);
  // });
});

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
