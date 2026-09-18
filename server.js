const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./')); // HTML, CSS, JS static load කිරීම

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection සහ Server එක Start කිරීම
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully! 🍃');

        // Database එක හරියටම Connect වුණාට පස්සේ Server එක Start වෙනවා
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err.message);
    });