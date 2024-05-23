const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Array to store tasks
let tasks = [];

// Set up body parser middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML file for the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Route to handle adding a new task
app.post('/addtask', (req, res) => {
    const newTask = req.body.newtask;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

// Route to handle removing a completed task
app.post('/removetask', (req, res) => {
    const completedTask = req.body.check;
    if (completedTask) {
        tasks = tasks.filter(task => task !== completedTask);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
});
// Serve tasks to the client-side JavaScript
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
