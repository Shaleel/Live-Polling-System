const Poll = require('../models/poll');
module.exports = {
    RecieveNewQuestion: (io) => async (data, callback) => {
        //saving these this question in DB.
        const newPoll = await Poll.create({
            title: data.title,
            options: data.options.map((option) => {
                return {
                    title: option,
                    impressions: 0
                };
            }),
            correctIndex: data.correctIndex,
            responses: [],
            timer: data.timer
        });

        io.emit('new-question', {
            _id: newPoll._id,
            title: newPoll.title,
            options: newPoll.options,
            timer: newPoll.timer
        }); //emitting for students

        setTimeout(async () => {
            const res = await Poll.findById(newPoll._id);
            io.emit('reveal-result', res);
        }, data.timer);

        callback({
            status: 'OK',
            pollData: newPoll
        });
    },
    RecieveNewResponse: (io) => async (data, callback) => {
        const res = await Poll.findById(data.pollId);
        let updatedOptions = res.options.map((val, i) => {
            return {
                ...val,
                impressions:
                    data.response == i ? val.impressions + 1 : val.impressions
            };
        });
        res.options = updatedOptions;
        res.responses.push({
            studentId: data.studentId,
            answer: data.response
        });
        res.save();

        io.emit('realtime-result', res);
        // console.log(res);
        callback({
            status: 'OK'
        });
    },

    Chat: (io) => async (data, callback) => {
        io.emit('chat', data);
    }
};
