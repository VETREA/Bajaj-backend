const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
