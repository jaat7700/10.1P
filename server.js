//a2a6343ea578cae13fe36a90af90905a-79295dd0-fcd9f3ad
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mailgun configuration
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api', 
    key: process.env.MAILGUN_API_KEY || 'a2a6343ea578cae13fe36a90af90905a-79295dd0-fcd9f3ad'
});

const MAILGUN_DOMAIN = 'sandboxbf043bb5726c4eacabee1d8c90656430.mailgun.org'; // Replace with your actual sandbox domain

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Newsletter signup endpoint
app.post('/api/newsletter/signup', async (req, res) => {
    const { email } = req.body;
    
    const emailData = {
        from: "Newsletter <mailgun@sandboxbf043bb5726c4eacabee1d8c90656430.mailgun.org>",
        to: [email],
        subject: "Welcome to Our Newsletter!",
        text: "Thank you for subscribing to our newsletter. We're excited to have you on board!",
        html: "<h1>Welcome to Our Newsletter!</h1><p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>"
    };

    try {
        const response = await mg.messages.create(MAILGUN_DOMAIN, emailData);
        console.log('Email sent:', response);
        res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to subscribe' });
    }
});

// Start server with error handling
const server = app.listen(port)
    .on('listening', () => {
        console.log(`Server running on port ${port}`);
    })
    .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}`);
            server.listen(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });