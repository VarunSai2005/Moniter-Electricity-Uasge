const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/FieldProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const energySchema = new mongoose.Schema({
    date: String,
    energy: String
});

const EnergyRecord = mongoose.model("RecInfo", energySchema, "RecInfo");

app.post("/saveEnergy", async (req, res) => {
    try {
        const newRecord = new EnergyRecord(req.body);
        await newRecord.save();
        res.json({ message: "Energy data saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "Error saving data." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
