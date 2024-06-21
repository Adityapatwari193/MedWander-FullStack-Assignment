
# MedWander Fullstack Assignment

## Overview
This repository contains the code for the MedWander FullStack Assignment, a web application designed to handle from data and display recent information through excel sheet.

## Setup Instructions

### Prerequisites
- Node.js
- MySQL

### Clone the Repository

git clone https://github.com/Adityapatwari193/MedWander-FullStack-Assignment.git
cd MedWander-FullStack-Assignment


### Backend Setup

1. **Set Up MySQL Database**
   Open the MySQL server path:
   
   cd C:\Program Files\MySQL\MySQL Server 8.1
   mysql -u username -p password
   
   Replace `username` and `password` with your MySQL credentials.
   
   For example:
   mysql -u root -p user


3. **Install Dependencies**
   npm install
   

4. **Run the Backend Server**
    node app.js
   

### Frontend Setup

1. **Navigate to Frontend Directory**
   cd frontend
   

2. **Install Dependencies**
   npm install
   

3. **Run the Frontend Server**
   npm start
   

### Usage

- Open your browser and navigate to `http://localhost:3000` for the backend.
- The frontend will run on `http://localhost:3001`. If prompted to run on another port, confirm by typing 'y' or 'yes'.

### Functionality

- Click the **Refresh** button to populate the Excel file with new data from the database.
- Ensure the Excel file is closed before sending a new request as it cannot be modified while open.

### API Endpoints

- **Submit Data**: `http://localhost:3000/submit`
- **Get Data**: `http://localhost:3000/getdata`

These endpoints allow for submitting form data and extracting the recent state of the database to display in the Excel file.

### Project Structure

MedWander-FullStack-Assignment/
├── 
│   ├── app.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── forms.xlsx
└── README.md

Thank You.

