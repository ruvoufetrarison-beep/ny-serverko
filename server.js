const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './database.json';

// Mamaky ny database (Database Reader)
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    try {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    } catch (e) { return []; }
};

// Manitsy ny database (Database Writer)
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

// Fanoratana anarana (Signup)
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const users = readDB();
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = { 
        username, password, mmm_id, 
        solfo: 0, 
        date: new Date().toLocaleDateString('mg-MG') 
    };
    users.push(newUser);
    writeDB(users);
    res.json({ success: true, user: newUser });
});

// Lisitry ny mpikambana
app.get('/api/members', (req, res) => res.json(readDB()));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER_READY_OK"));

