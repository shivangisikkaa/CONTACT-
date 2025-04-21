const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const authenticateUser = require("../middlewares/authMiddleware"); // Import authentication middleware

//  Get all contacts for logged-in user
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id }); // Fetch only user's contacts
    res.status(200).json(contacts);
});

// Create a new contact (Only logged-in users)
const createContact = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error("Name and email are required");
    }

    const contact = await Contact.create({
        userId: req.user.id, // Assign contact to the logged-in user
        name,
        email,
    });

    res.status(201).json(contact);
});

// ✅ Get a specific contact (Only if user owns it)
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized access");
    }

    res.status(200).json(contact);
});

//  Update contact (Only if user owns it)
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// ✅ Delete contact (Only if user owns it)
const removeContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized to delete this contact");
    }

    await contact.deleteOne();

    res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    removeContact
};
