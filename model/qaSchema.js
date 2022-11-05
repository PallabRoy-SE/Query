const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    userImage: {
        type: String,
    },
    question: {
        type: String,
    },
    answers: [
        {
            type: new mongoose.Schema(
                {
                    userName: {
                        type: String,
                        required: true
                    },
                    userEmail: {
                        type: String,
                        required: true
                    },
                    userImage: {
                        type: String,
                        required: true
                    },
                    answer: {
                        type: String,
                        required: true
                    }
                },
                { timestamps: true }
            )
        }
    ]
}, { timestamps: true })

const QuestionAnswers = mongoose.model('QANSWER', qaSchema);
module.exports = QuestionAnswers;