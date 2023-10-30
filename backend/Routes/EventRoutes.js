const express = require('express');
const router = express.Router();
const EventModel = require('../Models/EventModel');

router.post('/add', async (req, res) => {
    try {
        const { title, start, end, userId } = req.body;
        const event = await EventModel.create({ title, start, end, user: userId });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await EventModel.find();
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const events = await EventModel.find({ user: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
