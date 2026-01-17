const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './database.json';
const POSTS_FILE = './posts.json';

// Utility hamakiana sy hanoratana Database
const loadData = (file) => {
    try {
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
        console.error("Fahadisoana tamin'ny famakiana DB:", err);
        return [];
    }
};

const saveData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fahadisoana tamin'ny fitahirizana DB:", err);
    }
};

// Mpamorona ID MMMXXXXXXXXXX (10 isa) tsy manam-paharoa
const generateUniqueID = (existingUsers) => {
    let newID;
    let isDuplicate = true;
    while (isDuplicate) {
        const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
        newID = `MMM${randomDigits}`;
        isDuplicate = existingUsers.some(u => u.mmm_id === newID);
    }
    return newID;
};

// ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

// API: Register
app.post('/api/register', (req, res) => {
    try {
        const users = loadData(DB_FILE);
        const { anarana, tel, adiresy, pass, email } = req.body;

        if (!anarana || !tel || !pass) return res.status(400).json({ error: "Fenoy ny banga rehetra" });

        const newUser = {
            mmm_id: generateUniqueID(users),
            anarana, tel, adiresy, pass,
            email: email || "Tsy mbola misy",
            solfo: 0,
            status: "Membre Officiel",
            joinedDate: new Date().toLocaleDateString('mg-MG')
        };

        users.push(newUser);
        saveData(DB_FILE, users);
        res.json({ success: true, user: newUser });
    } catch (e) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.get('/api/members', (req, res) => res.json(loadData(DB_FILE)));

// REAL-TIME CHAT
io.on('connection', (socket) => {
    socket.on('send-private-msg', (data) => io.emit('new-private-msg', data));
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => console.log(`MI.M.Mi V6.0 GOLD LIVE`));
