const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow frontend to connect

// Root Route (Fix for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// GET /bfhl
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST /bfhl
app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item)); // Extract numbers
    const alphabets = data.filter(item => isNaN(item)); // Extract alphabets
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a))[alphabets.length - 1]] : [];

    res.json({
        is_success: true,
        user_id: "your_name_ddmmyyyy",
        email: "your_email@example.com",
        roll_number: "YourRollNumber",
        numbers,
        alphabets,
        highest_alphabet
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
