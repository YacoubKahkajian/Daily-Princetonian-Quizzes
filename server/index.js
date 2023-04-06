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

(async function() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads sheets
    const sheet1 = doc.sheetsByIndex[0]
    rows = await sheet1.getRows();
    console.log(rows.length);
    const sheet2 = doc.sheetsByIndex[1]
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

function getQuestions(first, last) {
    for (let i = first; i < last; i++) {
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

app.get("/api/question-data", (req, res) => {
    getQuestions();
    res.json(questionList);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});