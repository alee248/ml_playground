const express = require('express')
// const http = require('http');
const app = express();
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', routes);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    status: 'error',
    err: {
      message: err.message,
    },
  });
});

const server = app.listen(8080, () => {
    console.log('Server is up on port 8080');
});

// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });
  
function handleShutdownGracefully() {
    console.info('closing server gracefully...');
    server.close(() => {
        console.info('server closed.');
        process.exit(0); // if required
    });
}

// process.on('SIGINT', handleShutdownGracefully);
// process.on('SIGTERM', handleShutdownGracefully);
// process.on('SIGHUP', handleShutdownGracefully);