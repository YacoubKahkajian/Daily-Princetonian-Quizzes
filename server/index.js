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
            name: rows[i].name,
            date: rows[i].date,
            firstRow: rows[i].firstRow,
            lastRow: rows[i].lastRow
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