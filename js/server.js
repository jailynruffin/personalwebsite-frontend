const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to send email
app.post("/send-email", async (req, res) => {
    const { subject, email, message } = req.body;

    if (!subject || !email || !message) {
        return res.status(400).send("All fields are required.");
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com", // Replace with your email
            pass: "your-email-password", // Replace with your app password
        },
    });

    const mailOptions = {
        from: email,
        to: "jailynmruffin@gmail.com", // Your email
        subject: `New Contact Form Submission: ${subject}`,
        text: `You received a new message from ${email}:\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
