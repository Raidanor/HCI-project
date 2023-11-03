const express = require('express');
const router = express.Router();
const EventModel = require('../Models/EventModel');
const UserModel = require('../Models/UserModel'); 
const jwt = require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (token == null) return res.sendStatus(401);

jwt.verify(token, "HCI-Project!", async (err, decodedToken) => {
    if (err) return res.sendStatus(403);

    // Now find the user based on the ID or email in the decodedToken
    try {
        const user = await UserModel.findById(decodedToken.id); 
        if (!user) return res.status(404).json({ error: 'User not found' });
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
};


router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, start, end } = req.body;

    try{
        const calendarEvent = await EventModel.findOne({ _id: id, user: req.user._id});
        if(!calendarEvent) {
            return res.status(404).json({ error: 'No event found'})
        }

        calendarEvent.title = title;
        calendarEvent.start = start;
        calendarEvent.end = end;
        await calendarEvent.save();

        res.json(calendarEvent)
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
})

// Forgot the semi-colon and had a heartattack in the front end... 
router.patch('/:id/done', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { isDone } = req.body;

    try {
        const calendarEvent = await EventModel.findOne({ _id: id, user: req.user._id})
        if(!calendarEvent){
            return res.status(400).json({error: 'no Event found'})
        }

        // Dumb way to do it I think but bes we can do
        calendarEvent.isDone = isDone;
        await calendarEvent.save()
    }catch(error) {
        res.status(400).json({error: error.message})
    }
})


router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    // Bug testing for ID checking
    if (!id) {
        return res.status(400).send('No ID provided');
    }

    console.log('Delete request received for ID:', req.params.id);

    try{ 
        const calendarEvent = await EventModel.findOneAndDelete({ _id: id, user: req.user._id});
        if(!calendarEvent) {
            return res.status(404).json({ error: 'Event not found'})
        }
        // Because nothing needs to be sent back for deleting an event
        res.status(204).send() 
    }catch (error){
        res.status(500).json({ error: error.message})
    }
})

module.exports = router;
