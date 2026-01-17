const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './database.json';

// Mamaky ny Database
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    try {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    } catch (e) { 
        return []; 
    }
};

// Manitsy ny Database
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Pejy fidirana
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));

// --- API REHEFA MANAO SIGNUP (HIRONA) ---
app.post('/api/register', (req, res) => {
    try {
        const { username, phone, password, address, age } = req.body;
        const users = readDB();

        // Famoronana ID manokana MMM-XXXX
        const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;

        const newUser = { 
            username, 
            phone, 
            password, 
            address, 
            age,
            mmm_id, 
            solfo: 0, 
            history: [], // Tantaran'ny cotisation
            date_joined: new Date().toLocaleDateString('mg-MG') 
        };

        users.push(newUser);
        writeDB(users);

        console.log(`Mpikambana vaovao tafiditra: ${username} (${mmm_id})`);
        res.json({ success: true, mmm_id, user: newUser });

    } catch (error) {
        console.error("Erreur register:", error);
        res.status(500).json({ success: false, message: "Nisy olana teo am-pitahirizana" });
    }
});

// API fakana ny lisitry ny mpikambana
app.get('/api/members', (req, res) => {
    res.json(readDB());
});

// Port ho an'ny Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`SERVER MI.M.MI MIASA EO @ PORT ${PORT}`);
    console.log(`=================================`);
});

