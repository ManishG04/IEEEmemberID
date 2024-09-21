const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Load the Excel file
const workbook = xlsx.readFile('data.xlsx');
const sheetName = workbook.SheetNames[0];
const dataSheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(dataSheet);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/search', (req, res) => {
    const { name } = req.body;
    const results = data.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    res.json(results);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});