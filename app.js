const express = require('express');
const axios = require('axios');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

// --- AI TOKENS (Avela foana aloha mba hahafahana manao PUSH) ---
// Rehefa tafita any amin'ny GitHub ny code, vao ampidirina eto ny Token-nao ao anaty Termux
const tokens = ["", "", "", ""]; 
let currentTokenIndex = 0;

async function askAI(prompt) {
    if (!tokens[0]) {
        return "Fanamarihana: Tsy mbola tafiditra ny AI Token. Ampidiro ao amin'ny app.js ny Token-nao.";
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${tokens[currentTokenIndex]}`,
            'Content-Type': 'application/json'
        }
    };

    const data = {
        model: "gpt-4o",
        messages: [
            { 
                role: "system", 
                content: "Ianao dia MI.M.Mi V8.0, AI kristiana mpanolotsaina feno fitiavana sy fahendrena ho an'ny rahavavy kristiana." 
            },
            { role: "user", content: prompt }
        ]
    };

    try {
        const response = await axios.post('https://models.inference.ai.azure.com/chat/completions', data, config);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(`Olana tamin'ny Token ${currentTokenIndex}. Manandrana hafa...`);
        // Raha misy 4 tontolo ny tokens, dia manandrana ny manaraka
        if (tokens.length > 1) {
            currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
            return askAI(prompt);
        }
        return "Miala tsiny rahavavy, misy olana kely ny fifandraisana amin'ny AI.";
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Real-time Chat
io.on('connection', (socket) => {
    console.log('Misy mpampiasa niditra ny sehatra');
    
    socket.on('chat message', async (msg) => {
        const aiReply = await askAI(msg);
        socket.emit('ai reply', aiReply);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`MI.M.Mi V8.0 mandeha amin'ny port ${PORT}`);
    console.log('Afaka jerena ao amin'ny http://localhost:3000');
    console.log('-------------------------------------------');
});
