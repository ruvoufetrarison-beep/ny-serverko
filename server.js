const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = './database.json';
const readDB = () => { if (!fs.existsSync(DB_FILE)) return []; try { return JSON.parse(fs.readFileSync(DB_FILE)); } catch (e) { return []; } };
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'dashboard.html')));
app.get('/admin-mimi', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

app.post('/api/register', (req, res) => {
    const users = readDB();
    const mmm_id = `MMM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = { ...req.body, mmm_id, solfo: 0, history: [], date_joined: new Date().toLocaleDateString('mg-MG') };
    users.push(newUser);
    writeDB(users);
    res.json({ success: true, mmm_id, user: newUser });
});

app.post('/api/admin/update-solfo', (req, res) => {
    const { mmm_id, amount } = req.body;
    let users = readDB();
    const index = users.findIndex(u => u.mmm_id === mmm_id);
    if (index !== -1) {
        users[index].solfo += parseInt(amount);
        users[index].history.unshift({ date: new Date().toLocaleDateString('mg-MG'), amount: amount });
        writeDB(users);
        return res.json({ success: true });
    }
    res.status(404).json({ success: false });
});

app.get('/api/members', (req, res) => res.json(readDB()));

io.on('connection', (socket) => {
    socket.on('send_msg', (data) => { io.emit('receive_msg', data); });
});

http.listen(process.env.PORT || 3000, () => console.log("SERVER_V2_READY"));

