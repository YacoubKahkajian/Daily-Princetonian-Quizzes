require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const express = require("express");
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
const app = express();
const PORT = process.env.PORT || 3001;
let rows;
let questions;
let quizList = [];
let routeList = {};
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
            subtitle: rows[i].subtitle,
            date: rows[i].date,
            firstRow: rows[i].firstRow,
            lastRow: rows[i].lastRow,
            imageURL: rows[i].imageURL,
            route: rows[i].route
        };
        quizList.push(obj);
        routeList[rows[i].route] = i;
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
    const short = req.body.shortName;
    const i = routeList[short];
    getQuestions(quizList[i].firstRow - 1, quizList[i].lastRow - 1);
    res.json({
        title: quizList[i].name,
        subtitle: quizList[i].subtitle,
        questions: questionList,
        range: {
            first: quizList[i].firstRow - 1,
            last: quizList[i].lastRow - 1
        }
    });
    questionList = [];
});

// Processes quiz submissions.
app.post("/api/submits", (req, res) => {
    // Convert the JSON object into a 2d matrix.
    const formAnswers = Object.entries(req.body.formData);

    // Put the placement of the option chosen in an array.
    let answerArray = [];
    let blanks = false;
    for (let i = 0; i < formAnswers.length; i++) {
        answerArray[i] = formAnswers[i][1];
        if (formAnswers[i][1] == 0) blanks = true;
    }

    // Since the order of the questions in the DB and the order of
    // the answerArray should be parallel, we can compare the two
    // in the same for loop.
    let correct = [];
    let j = 0;
    for (let i = req.body.range.first; i <= req.body.range.last; i++) {
        correct[j] = questions[i].correct === answerArray[j];
        j++;
    }
    res.json({blanks, correct});
});