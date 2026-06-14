const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(cors());

// Route
app.post("/contact", async (req, res) => {

    console.log("Request received!");
    console.log(req.body);

    const { name, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: "naleodas2027@gmail.com",
                pass: "YOUR_NEW_APP_PASSWORD"
            }

        });

        const mailOptions = {

            from: "naleodas2027@gmail.com",

            to: email,

            subject: "Thank you for contacting us",

            html: `
                <h2>Hello ${name}</h2>

                <p>Thank you for contacting us.</p>

                <p>We have received your message:</p>

                <p>${message}</p>

                <br>

                <p>Our team will contact you shortly.</p>

            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Mail Sent Successfully!");
        console.log(info);

        res.json({
            success: true,
            message: "Email sent successfully!"
        });

    }

    catch (error) {

        console.log("ERROR OCCURRED:");
        console.log(error);

        res.json({
            success: false,
            message: "Failed to send email"
        });

    }

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});