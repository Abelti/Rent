require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utilities/databaseConnection');
const upload = require('./utilities/upload');

const MANAGER = require('./routes/managerRoutes');
const property_owner = require('./routes/poRoutes')

const port = process.env.PORT || 4040;

connectDB();

app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Test");
});

// Add routes for property_owner endpoints here
app.use('/api/po', property_owner);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
