const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
// for MongoDB database connection
require('../db/mdbConn');
const QuestionAnswers = require('../model/qaSchema');

router.get('/queans', async (req, res) => {
    const qa = await QuestionAnswers.find().sort({ 'createdAt': 'desc' });
    res.send(qa)
})

router.get('/userqueans/:userEmail', async (req, res) => {
    let userEmail = req.params.userEmail;
    const qa = await QuestionAnswers.find({ userEmail }).sort({ 'createdAt': 'desc' });
    res.send(qa)
})

router.get('/search/:query', async (req, res) => {
    let query = new RegExp(req.params.query, 'i');
    const qa = await QuestionAnswers.find({ $or: [{ userEmail: query }, { question: query }, { "answers.answer": query }, { "answers.userEmail": query }] }).sort({ 'createdAt': 'desc' });
    res.send(qa)
})

router.post('/question', authenticate, async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(422).json({ error: "Filled the filds properly" });
    }
    try {
        const addQuestion = new QuestionAnswers({ userName: req.rootUser.name, userEmail: req.rootUser.email, userImage: req.rootUser.image, question: question });
        await addQuestion.save();
        res.status(200).json({ message: "Question added successfully." });
    } catch (error) {
        console.log(error)
        res.status(421).json({ error: "Dataabase Error!" });
    }
})

router.post('/answer', authenticate, async (req, res) => {
    const { question, answer } = req.body;
    const questionID = question._id;
    if (!answer) {
        return res.status(422).json({ error: "Filled the filds properly" });
    }
    try {
        const newAnswer = { userName: req.rootUser.name, userEmail: req.rootUser.email, userImage: req.rootUser.image, answer }
        let question = await QuestionAnswers.findById(questionID);
        question.answers.push(newAnswer);
        await question.save();
        res.status(200).json({ message: "Answers added successfully." });
    } catch (error) {
        console.log(error)
        res.status(421).json({ error: "Dataabase Error!" });
    }
})

module.exports = router;