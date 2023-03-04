require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const express = require("express");
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
const app = express();
const PORT = process.env.PORT || 3001;
let rows;
let final = [];

(async function() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[0];
    rows = await sheet.getRows();
    build();
}());

function build() {
    for (let i = 0; i < rows.length; i++) {
        let obj = {
            q: rows[i].q,
            qimg: rows[i].qimg,
            c1: rows[i].c1,
            c1img: rows[i].c1img,
            c2: rows[i].c2,
            c2img: rows[i].c2img,
            c3: rows[i].c3,
            c3img: rows[i].c3img,
            c4: rows[i].c4,
            c4img: rows[i].c4img,
            correct: rows[i].correct
        };
        final.push(obj);
    }
}

app.get("/api", (req, res) => {
    res.json(final);
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});