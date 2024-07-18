const express = require('express');
const app = express();

require('dotenv').config();

const manager = require('./routes/managerRoutes');

const port = process.env.PORT || 4040;

app.use(express.json());

app.get('/test', (req, res) => {
    res.send("Test");
});

// Add routes for manager endpoints here
app.use('/api/manager', manager);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})