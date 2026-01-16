const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Tahiry ho an'ny mpikambana (Database vonjimaika)
let users = [];

// 1. Pejy fidirana (Login/Signup)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. Pejy Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// 3. API hisoratana anarana (Signup)
app.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;
    
    // Mamorona ID automatique (ohatra: MMM-2026-001)
    const mmm_id = `MMM-2026-${String(users.length + 1).padStart(3, '0')}`;
    
    const newUser = { username, password, email, mmm_id };
    users.push(newUser);
    
    console.log("Mpikambana vaovao:", newUser);
    res.json({ success: true, mmm_id: mmm_id });
});

// 4. API hahitana ny lisitry ny mpikambana rehetra
app.get('/api/members', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server mandeha eo amin'ny port ${PORT}`));

