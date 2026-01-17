const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Tahiry vonjimaika
let users = [];

// Pejy fidirana (Login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Pejy Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// API Signup
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;
    users.push({ username, password, mmm_id });
    res.json({ success: true, mmm_id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server mandeha amin'ny port " + PORT));

