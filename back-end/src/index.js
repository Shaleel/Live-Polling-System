const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const socketEvents = require('./events/socket-events');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/error-handler');
const createError = require('http-errors');
const studentRoutes = require('./routes/student');
const pollRoutes = require('./routes/polls');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());
//database connection
mongoose
    .connect(
        'mongodb+srv://Shaleel:slvZVDIF94CHw8Jt@cluster0.bc1ik2l.mongodb.net/Interveu-Assignment'
    )
    .then(() => console.log('DB Connected'));

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

//routes
app.use('/student', studentRoutes);
app.use('/poll', pollRoutes);

// --------------------------deployment------------------------------
__dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'front-end/dist')));

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'front-end', 'dist', 'index.html'))
);

// --------------------------deployment------------------------------

//any endpoint
app.use(async (req, res, next) => {
    next(createError.NotFound());
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

io.on('connection', socketEvents(io));

server.listen(PORT, () => {
    console.log('listening on :' + PORT);
});
