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

// --- SWITCHER AI TOKENS ---
const tokens = [
    "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",
    "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",
    "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"
];

let currentTokenIndex = 0;

async function askAI(prompt) {
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
                content: "Ianao dia MI.M.Mi V8.0 Gold. AI kristiana mpanolotsaina feno fitiavana, fahendrena ary fahalalana. Mitena amin'ny fomba malefaka sy manampy ny rahavavy kristiana foana ianao." 
            },
            { role: "user", content: prompt }
        ]
    };

    try {
        const response = await axios.post('https://models.inference.ai.azure.com/chat/completions', data, config);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(`Token faha-${currentTokenIndex + 1} nisy olana. Manova token...`);
        
        // Manandrana ny token manaraka raha misy error
        currentTokenIndex++;
        
        if (currentTokenIndex < tokens.length) {
            return askAI(prompt);
        } else {
            currentTokenIndex = 0; // Averina amin'ny voalohany raha lany rehetra
            return "Miala tsiny rahavavy, misy olana kely ny fifandraisako amin'ny loharano. Andramo indray afaka fotoana fohy.";
        }
    }
}

// Pejy voalohany
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fifandraisana Socket.io (Real-time Chat)
io.on('connection', (socket) => {
    console.log('Misy mpampiasa niditra ny sehatra');

    socket.on('chat message', async (msg) => {
        const aiReply = await askAI(msg);
        socket.emit('ai reply', aiReply);
    });

    socket.on('disconnect', () => {
        console.log('Misy nivoaka ny sehatra');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('===========================================');
    console.log(`✨ MI.M.Mi V8.0 GOLD efa mandeha!`);
    console.log(`🌐 Port: ${PORT}`);
    console.log(`🔗 Sokafy: http://localhost:${PORT}`);
    console.log('===========================================');
});
