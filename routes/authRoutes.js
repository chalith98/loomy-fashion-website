const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'මේ Email එකෙන් කලින් යූසර් කෙනෙක් රෙජිස්ටර් වෙලා ඉන්නවා!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User සාර්ථකව Register වුණා!' });
    } catch (err) {
        res.status(500).json({ message: 'Server එකේ අවුලක්!' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email හෝ Password වැරදියි!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Email හෝ Password වැරදියි!' });

        res.json({ message: 'Login වීම සාර්ථකයි!', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server එකේ අවුලක්!' });
    }
});

module.exports = router;