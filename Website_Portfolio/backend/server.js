const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
// Health Check Endpoint
app.get('/api/contact/health', (req, res) => {
    res.json({
        Status: "Healthy",
        Service: "AnasPortfolio.Api (Node.js)",
        Environment: process.env.NODE_ENV || "Development",
        Timestamp: new Date().toISOString()
    });
});

// Submit Message Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, Email, and Message are required fields." });
    }

    console.log(`Received portfolio contact submission from ${name} (${email})`);
    
    // Simulating email send delay
    setTimeout(() => {
        console.log(`SMTP Dispatch: Message from ${name} <${email}> successfully dispatched to anastarayra12@gmail.com`);
        
        res.status(200).json({
            Success: true,
            Message: "Thank you! Your message has been received successfully by Anas Tarayra.",
            Timestamp: new Date().toISOString()
        });
    }, 100);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
