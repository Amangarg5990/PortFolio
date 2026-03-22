import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_FILE = path.join(__dirname, '../data/messages.json');

const router = express.Router();

// Helper to read messages
const readMessages = () => {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading messages file:', err.message);
        return [];
    }
};

// Helper to write messages
const writeMessages = (messages) => {
    try {
        // Ensure data directory exists
        const dataDir = path.dirname(MESSAGES_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing messages file:', err.message);
    }
};

// POST contact form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Save to local file
        const messages = readMessages();
        const newMessage = {
            id: Date.now().toString(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        writeMessages(messages);

        console.log(`✅ Message from ${name} saved locally via Web3Forms sync.`);

        res.status(201).json({ message: 'Message saved successfully!', data: newMessage });
    } catch (err) {
        console.error('Contact form error:', err.message);
        // Explicitly return the error message so the user knows what's wrong
        res.status(500).json({ 
            error: err.message || 'Failed to process contact message.' 
        });
    }
});

export default router;
