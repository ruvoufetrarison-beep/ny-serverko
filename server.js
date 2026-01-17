const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Ity no manery ny pejy voalohany ho ilay LOGIN MAVOKELY
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    res.json({ success: true, user: { username, mmm_id: "MMM-"+Math.floor(1000+Math.random()*9000) } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server Live"));

