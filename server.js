const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// Route
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log("Request received:", req.body);

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "naleodas2027@gmail.com",
                pass: "bwrrpduonakiacvf" // IMPORTANT
            }
        });

        // EMAIL SENT TO USER (Auto Reply)
        const mailOptions = {
            from: `"EduLearn Team" <naleodas2027@gmail.com>`,
            to: email,
            subject: "Thanks for contacting EduLearn 🎓",
            html: `
                <div>
                    <h2>Hello ${name},</h2>
                    <p>Thanks for contacting us!</p>
                    <p><b>Your Message:</b></p>
                    <p>${message}</p>
                    <br/>
                    <p>We will get back to you soon.</p>
                    <hr/>
                    <p>EduLearn Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log("EMAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Email sending failed",
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});