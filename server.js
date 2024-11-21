const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json()); // To parse incoming JSON data

// In-memory storage for flashcards (we won't use a database)
let flashcards = [];

// Endpoint to get all flashcards
app.get('/api/flashcards', (req, res) => {
    res.json(flashcards);
});

// Endpoint to add a new flashcard
app.post('/api/flashcards', (req, res) => {
    const { word, translation } = req.body;
    if (word && translation) {
        flashcards.push({ word, translation });
        res.status(201).send({ message: 'Flashcard added!' });
    } else {
        res.status(400).send({ message: 'Please provide both word and translation' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
