const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Tahiry vonjimaika (Database)
let users = [{ username: "Admin Mi.M.Mi", mmm_id: "MMM-2026-000" }]; 

// Pejy fidirana
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Pejy Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// API Signup/Login
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = { username, password, mmm_id };
    users.push(newUser);
    res.json({ success: true, user: newUser });
});

// API Lisitry ny mpikambana
app.get('/api/members', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server mandeha @ ${PORT}`));

