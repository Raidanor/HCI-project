const express = require('express');
const router = express.Router();
const EventModel = require('../Models/EventModel');
const UserModel = require('../Models/UserModel'); // Replace with your actual User Model
const jwt = require('jsonwebtoken');

// Middleware to authenticate and set the user in the request
const authenticateToken = async (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (token == null) return res.sendStatus(401);

jwt.verify(token, "HCI-Project!", async (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    // Now find the user based on the ID or email in the decodedToken
    try {
      const user = await UserModel.findById(decodedToken.id); // assuming your token has an 'id' field
        if (!user) return res.status(404).json({ error: 'User not found' });
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
};

// Event creation 
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, start, end } = req.body;
        const event = await EventModel.create({ title, start, end, user: req.user._id });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all events for logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const events = await EventModel.find({ user: req.user._id });
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
