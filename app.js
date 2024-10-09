const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Handle JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Use the user routes
app.use('/', userRoutes);

app.listen(4000, () => {
    console.log('Server is running on localhost:4000');
});
