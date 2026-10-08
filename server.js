/**
 * Simple Beginner Backend for Foodies Delight
 * Framework: Express.js (Node.js)
 * Storage: Simple JSON files in /data folder
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable JSON body parsing and CORS
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, Images)
app.use(express.static(__dirname));

// Ensure the data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper: Read data from JSON file safely
function readData(filename) {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return [];
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content || '[]');
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
        return [];
    }
}

// Helper: Append data to JSON file
function appendData(filename, newEntry) {
    const filePath = path.join(DATA_DIR, filename);
    const existing = readData(filename);
    const record = {
        id: Date.now(),
        ...newEntry,
        createdAt: new Date().toLocaleString()
    };
    existing.push(record);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    return record;
}

// ======================== API ROUTES ========================

// 1. PLACE AN ORDER
app.post('/api/order', (req, res) => {
    const { items, totalAmount, customerName } = req.body;
    
    if (!totalAmount || totalAmount <= 0) {
        return res.status(400).json({ success: false, message: "Order cannot be empty." });
    }

    const savedOrder = appendData('orders.json', {
        customerName: customerName || 'Guest User',
        items: items || {},
        totalAmount
    });

    console.log(`[ORDER] Placed successfully! Order #${savedOrder.id} - Total: ₹${totalAmount}`);
    res.json({
        success: true,
        message: "Order placed successfully!",
        order: savedOrder
    });
});

// GET ALL ORDERS
app.get('/api/orders', (req, res) => {
    res.json(readData('orders.json'));
});

// 2. USER SIGN UP / REGISTRATION
app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, mobile } = req.body;

    if (!firstName || !email) {
        return res.status(400).json({ success: false, message: "First name and email are required." });
    }

    const savedUser = appendData('users.json', {
        firstName,
        lastName,
        email,
        mobile
    });

    console.log(`[USER] New signup: ${firstName} ${lastName} (${email})`);
    res.json({
        success: true,
        message: "Registration successful! Welcome, " + firstName + "!",
        user: savedUser
    });
});

// GET ALL REGISTERED USERS
app.get('/api/users', (req, res) => {
    res.json(readData('users.json'));
});

// 3. SEND FEEDBACK
app.post('/api/feedback', (req, res) => {
    const { firstName, lastName, phone, email, feedback, mayContact } = req.body;

    if (!firstName || !feedback) {
        return res.status(400).json({ success: false, message: "Name and feedback are required." });
    }

    const savedFeedback = appendData('feedback.json', {
        firstName,
        lastName,
        phone,
        email,
        feedback,
        mayContact: !!mayContact
    });

    console.log(`[FEEDBACK] Received from ${firstName}: "${feedback.substring(0, 30)}..."`);
    res.json({
        success: true,
        message: "Thank you for your feedback! Visit again!",
        feedback: savedFeedback
    });
});

// GET ALL FEEDBACK
app.get('/api/feedback', (req, res) => {
    res.json(readData('feedback.json'));
});

// Root fallback to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ======================== START SERVER ========================
app.listen(PORT, () => {
    console.log("==================================================");
    console.log(` Foodies Delight Backend is running!`);
    console.log(` Local URL:    http://localhost:${PORT}`);
    console.log(` Orders API:   http://localhost:${PORT}/api/orders`);
    console.log(` Users API:    http://localhost:${PORT}/api/users`);
    console.log(` Feedback API: http://localhost:${PORT}/api/feedback`);
    console.log("==================================================");
});
