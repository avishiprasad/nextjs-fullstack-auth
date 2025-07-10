import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        // Create random token
        const randomToken = crypto.randomBytes(32).toString("hex");

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: randomToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: randomToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
            });
        }

        // Setup nodemailer transport
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b7ae44d522c077",
                pass: "ef701b06b94574"
            }
        });

        // Email options
        const mailOptions = {
            from: 'no-reply@yourapp.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${randomToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
            <br><br>Or copy and paste this link in your browser:<br>${process.env.DOMAIN}/verifyemail?token=${randomToken}
            </p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
