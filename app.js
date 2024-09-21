const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Disable caching of static files
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

// Load the Excel file
const workbook = xlsx.readFile('data.xlsx');
const sheetName = workbook.SheetNames[0];
const dataSheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(dataSheet);

// Log the loaded Excel data for debugging
console.log('Data loaded from Excel:', data);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/search', (req, res) => {
    console.log('Received search request'); // Log when request is received
    
    const { name } = req.body;
    
    // Check if the request body has been parsed correctly
    if (!req.body || !name) {
        console.log('No name provided in the request:', req.body);
        return res.status(400).json({ error: 'No name provided' });
    }

    // Log the search term for debugging
    console.log('Search term received:', name);

    // Return an empty array if no name is provided
    if (!name.trim()) {
        console.log('Empty search term.');
        return res.json([]);
    }

    const results = data.filter(item => {
        // Check if the 'Name' field exists, trim it, and compare it
        if (item.Name && typeof item.Name === 'string') {
            return item.Name.trim().toLowerCase().includes(name.trim().toLowerCase());
        }
        return false;
    });

    // Log the results for debugging
    console.log('Search results:', results);

    // Send the response with the filtered data
    res.json(results);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
