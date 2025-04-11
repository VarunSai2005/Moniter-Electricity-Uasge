const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username, password });
        await newUser.save();
        res.json({ message: "User saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
