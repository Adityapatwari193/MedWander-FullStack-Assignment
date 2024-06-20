const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const validateFormData = require('./validateMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your database username
    password: 'user', // replace with your database password
    database: 'forms'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        form_type VARCHAR(1),
        name VARCHAR(100),
        country_code VARCHAR(10),
        phone_number VARCHAR(20)
    );
`;

db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created or already exists.");
});

app.post('/submit', validateFormData, (req, res) => {
    const { formType, name, countryCode, phoneNumber } = req.body;

    const insertQuery = 'INSERT INTO forms (form_type, name, country_code, phone_number) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [formType, name, countryCode, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('Form data saved successfully');
    });
});




app.get('/api/export-excel', async (req, res) => {
    try {
        // Fetch data from database
        const selectQuery = 'SELECT * FROM forms';
        const [rows] = await db.promise().query(selectQuery);

        // Path to the Excel file
        const filePath = path.join(__dirname, 'forms.xlsx');

        
        const workbook = new ExcelJS.Workbook();
        let sheet = workbook.getWorksheet('Forms');
        if (!sheet) {
            sheet = workbook.addWorksheet('Forms');

            // Define headers for Excel sheet
            sheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Form Type', key: 'form_type', width: 15 },
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Country Code', key: 'country_code', width: 15 },
                { header: 'Phone Number', key: 'phone_number', width: 20 }
            ];
        }

        // Add rows from database to Excel sheet
        rows.forEach(row => {
            console.log('Adding row:', row); // Debugging: log the row being added
            sheet.addRow({
                id: row.id,
                form_type: row.form_type,
                name: row.name,
                country_code: row.country_code,
                phone_number: row.phone_number
            });
        });

        // Save the workbook to a file
        await workbook.xlsx.writeFile(filePath);

        // Open the Excel file using the default application
        const open = await import('open');
        await open.default(filePath);

        // Send response message
        res.status(200).send('Excel file created and opened successfully');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
