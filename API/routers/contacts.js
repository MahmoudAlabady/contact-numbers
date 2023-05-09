const express = require('express');
const auth = require('../middelware/auth')

const router = new express.Router();
const Contact = require('../models/contact');


// Create a new contact
// router.post('/api/contacts', auth, async (req, res) => {
    router.post('/api/contacts',  async (req, res) => {

    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.json(contact);
    } catch (error) {
        console.log('Error creating contact:', error);
        res.status(500).json({
            message: 'Error creating contact'
        });
    }
});

// Get a list of contacts
// router.get('/api/contacts', auth, async (req, res) => {
    router.get('/api/contacts', async (req, res) => {

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    const filters = {};
    if (req.query.name) {
        filters.name = new RegExp(req.query.name, 'i');
    }
    if (req.query.phone) {
        filters.phone = new RegExp(req.query.phone, 'i');
    }
    if (req.query.address) {
        filters.address = new RegExp(req.query.address, 'i');
    }
    try {
        const count = await Contact.countDocuments(filters);
        const contacts = await Contact.find(filters).sort({
            createdAt: -1
        }).skip(skip).limit(perPage);
        res.json({
            count,
            contacts
        });
    } catch (error) {
        console.log('Error getting contacts:', error);
        res.status(500).json({
            message: 'Error getting contacts'
        });
    }
});

// Edit a contact
// router.put('/api/contacts/:id', auth, async (req, res) => {
    router.put('/api/contacts/:id', async (req, res) => {

    // Check if the contact is locked
    const contact = await Contact.findById(req.params.id);
    if (contact.lockedBy && contact.lockedBy !== req.user.username) {
        return res.status(403).json({
            message: 'Contact is locked'
        });
    }
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(updatedContact);
    } catch (error) {
        console.log('Error updating contact:', error);
        res.status(500).json({
            message: 'Error updating contact'
        });
    }
});


// Delete a contact
router.delete('/api/contacts/:id', async (req, res) => {
    // Check if the contact is locked
    const contact = await Contact.findById(req.params.id);
    if (contact.lockedBy && contact.lockedBy !== req.user.username) {
        return res.status(403).json({
            message: 'Contact is locked'
        });
    }
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Contact deleted'
        });
    } catch (error) {
        console.log('Error deleting contact:', error);
        res.status(500).json({
            message: 'Error deleting contact'
        });
    }
});

// Lock a contact
router.post('/api/contacts/:id/lock', auth, async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact.lockedBy) {
        return res.status(403).json({
            message: 'Contact is already locked'
        });
    }
    contact.lockedBy = req.user.username;
    try {
        await contact.save();
        res.json(contact);
    } catch (error) {
        console.log('Error locking contact:', error);
        res.status(500).json({
            message: 'Error locking contact'
        });
    }
});

// Unlock a contact
router.post('/api/contacts/:id/unlock', auth, async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact.lockedBy || contact.lockedBy !== req.user.username) {
        return res.status(403).json({
            message: 'Contact is not locked by you'
        });
    }
    contact.lockedBy = null;
    try {
        await contact.save();
        res.json(contact);
    } catch (error) {
        console.log('Error unlocking contact:', error);
        res.status(500).json({
            message: 'Error unlocking contact'
        });
    }
});

module.exports = router;