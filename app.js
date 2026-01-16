const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const DB_FILE = './mpikambana.json';
const RESAKA_FILE = './resaka.json';

app.use(express.json());
app.use(express.static('public'));

if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

app.post('/signup', (req, res) => {
    const { tel, password, anarana, fanampiny, adiresy, taona } = req.body;
    let data = JSON.parse(fs.readFileSync(DB_FILE));
    
    // Generer MMM + 10 chiffres aléatoires
    const randomDigits = Math.floor(Math.random() * 9000000000) + 1000000000;
    const mmiId = "MMM" + randomDigits;

    const vaovao = { 
        id: mmiId, tel, password, anarana, fanampiny, adiresy, taona,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mmiId}`,
        joinedDate: new Date().toLocaleDateString()
    };
    
    data.push(vaovao);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, member: vaovao });
});

app.post('/login', (req, res) => {
    const { tel, password } = req.body;
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    const user = data.find(u => u.tel === tel && u.password === password);
    res.json(user ? { success: true, member: user } : { success: false });
});

server.listen(process.env.PORT || 3000);

