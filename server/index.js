require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const express = require("express");
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
const app = express();
const PORT = process.env.PORT || 3001;
let rows;
let questions;
let quizList = [];
let questionList = [];

// Load the spreadsheet data needed using the GoogleSpreadsheet
// library.
(async function() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads sheets
    const sheet1 = doc.sheetsByIndex[0];
    const sheet2 = doc.sheetsByIndex[1];
    rows = await sheet1.getRows();
    questions = await sheet2.getRows();
    getQuizzes();
}());

function getQuizzes() {
    for (let i = 0; i < rows.length; i++) {
        let obj = {
            name: rows[i].name,
            date: rows[i].date,
            firstRow: rows[i].firstRow,
            lastRow: rows[i].lastRow,
            route: rows[i].route,
            imageURL: rows[i].imageURL
        };
        quizList.push(obj);
    }
}

// TO-DO: Find a way to use an array for the options?
function getQuestions(first, last) {
    for (let i = first; i <= last; i++) {
        let obj = {
            q: questions[i].q,
            option1: questions[i].option1,
            option2: questions[i].option2,
            option3: questions[i].option3,
            option4: questions[i].option4,
            questionImg: questions[i].questionImg
        }
        questionList.push(obj);
    }
}

app.get("/api/quiz-data", (req, res) => {
    res.json(quizList);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(express.json());

// Uses the body of the request to get a specific range of questions
// to add to the resulting list. Clears the list afterward to avoid
// duplication upon refresh.
app.post("/api/question-data", (req, res) => {
    getQuestions(req.body.first - 1, req.body.last - 1);
    res.json(questionList);
    questionList = [];
});

// Processes quiz submissions.
app.post("/api/submits", (req, res) => {
    // Convert the JSON object into a 2d matrix.
    const formAnswers = Object.entries(req.body.formData);

    // Put the placement of the option chosen in an array.
    let answerArray = [];
    for (let i = 0; i < formAnswers.length; i++)
        answerArray[i] = formAnswers[i][1];

    // Since the order of the questions in the DB and the order of
    // the answerArray should be parallel, we can compare the two
    // in the same for loop.
    let correct = [];
    let j = 0;
    for (let i = req.body.range.first - 1; i <= req.body.range.last - 1; i++) {
        correct[j] = questions[i].correct === answerArray[j];
        j++;
    }
    res.json(correct);
});