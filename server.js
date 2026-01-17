const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './database.json';

const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(DB_FILE)); } catch (e) { return []; }
};

const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

app.post('/api/register', (req, res) => {
    const users = readDB();
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = { 
        ...req.body, 
        mmm_id, 
        solfo: 0, 
        history: [],
        date: new Date().toLocaleDateString('mg-MG') 
    };
    users.push(newUser);
    writeDB(users);
    res.json({ success: true, mmm_id, user: newUser });
});

app.get('/api/members', (req, res) => res.json(readDB()));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER_READY_OK"));

