const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let users = []; 

// Hitondra any amin'ny login.html rehefa sokafana ny site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Pejy Dashboard (ao amin'ny folder views)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// API handraisana ny login/signup
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9999)}`;
    users.push({ username, password, mmm_id });
    res.json({ success: true, mmm_id });
});

// API hahitana ny mpikambana ao amin'ny Dashboard
app.get('/api/members', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server mandeha..."));

