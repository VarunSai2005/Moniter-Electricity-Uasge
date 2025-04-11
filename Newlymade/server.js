// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB Compass
const dbURI = 'mongodb://localhost:27017/saveelec';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const roomSchema = new mongoose.Schema({
    floor: Number,
    roomno: Number,
    cfans: Number,
    cpow: Number,
    computers: Number,
    compow: Number,
    bulbs: Number,
    bulpow: Number
});

const Room = mongoose.model('saveelec1', roomSchema);

// API to fetch room details
app.get('/room/:roomNumber', async (req, res) => {
    try {
        const room = await Room.findOne({ roomno: parseInt(req.params.roomNumber) });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});