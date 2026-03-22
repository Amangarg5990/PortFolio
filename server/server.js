import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js';
import liveStatsRoutes from './routes/liveStats.js';
import contactRoutes from './routes/contact.js';
import { syncAll } from './services/syncService.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api', apiRoutes);
app.use('/api/live', liveStatsRoutes);

// Optional: health check route (good for Render)
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

// ✅ ALWAYS listen (fixes your crash)
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        console.log('🔄 Starting initial sync...');
        const result = await syncAll();

        console.log('📊 Initial CSV sync complete:');

        if (result.leetcode?.synced)
            console.log(`⚡ LeetCode: ${result.leetcode.total} questions`);

        if (result.hackerrank?.synced)
            console.log(`🟢 HackerRank: ${result.hackerrank.total} domains`);

        if (result.gfg?.synced)
            console.log(`🌿 GFG synced`);

    } catch (err) {
        console.error('❌ Sync error:', err.message);
    }
});