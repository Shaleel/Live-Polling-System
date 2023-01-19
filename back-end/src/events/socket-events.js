const {
    RecieveNewQuestion,
    RecieveNewResponse,
    Chat
} = require('../middlewares/socket-middlewares');

module.exports = (io) =>
    function (socket) {
        console.log('a user connected');

        socket.on('new-question', RecieveNewQuestion(io));

        socket.on('response', RecieveNewResponse(io));

        socket.on('chat', Chat(io));
    };
