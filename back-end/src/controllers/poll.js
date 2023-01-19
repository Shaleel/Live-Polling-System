const createError = require('http-errors');
const Poll = require('../models/poll');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const list = await Poll.find();

            res.json(list);
        } catch (error) {
            next(error);
        }
    }
};
