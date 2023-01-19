const createError = require('http-errors');
const Students = require('../models/students');

module.exports = {
    createStudent: async (req, res, next) => {
        try {
            if (!req.body.name) {
                throw createError.BadRequest('name cannot be empty');
            }
            const student = await Students.create({
                name: req.body.name
            });

            if (!student) {
                throw createError.BadRequest('student does not exist');
            }

            res.json({ student });
        } catch (error) {
            next(error);
        }
    },
    getStudentById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const student = await Students.findById(id);

            if (!student) {
                throw createError.BadRequest('student does not exist');
            }

            res.json({ student });
        } catch (error) {
            next(error);
        }
    }
};
