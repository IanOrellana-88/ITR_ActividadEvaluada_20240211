import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import studentsModel from "../models/students.js";
import { config } from "../../config.js";
 
const registerStudentsController = {};
 
registerStudentsController.registerStudent = async (req, res) => {
    const { name, lastName, email, password, birthdate, specialty, carnet, phone, isVerified, loginAttemps, timeOut } = req.body;
 
    try {
        const existStudent = await studentsModel.findOne({ email });
        if (existStudent) return res.status(400).json({ message: "Student already exists" });
 
        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomNumber = crypto.randomBytes(3).toString("hex");
 
        const token = jsonwebtoken.sign(
            { randomNumber, name, lastName, birthdate, email, password: passwordHashed, isVerified },
            config.JWT.secret,
            { expiresIn: "15m" }
        );
 
        res.cookie("registrarionCookie", token, { maxAge: 15 * 60 * 1000 });
 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.user_email,
                pass: config.user_password,
            },
        });
 
        const mailOptions = {
            from: config.user_email,
            to: email,
            subject: "Email verification",
            text: "Para verificar tu cuenta usa el siguiente código: " + randomNumber + " expira en 15 m",
        };
 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Verification email sent" });
        });
 
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}; 
 
registerStudentsController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.registrarionCookie;
        
        if (!token) return res.status(400).json({ message: "Token expired or not found" });
 
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { randomNumber: storedCode, name, lastName, email, birthdate, password } = decoded;
 
        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }
 
        const newStudent = new studentsModel({
            name,
            lastName,
            email,
            birthdate,
            password,
            isVerified: true,
        });
 
        await newStudent.save();
        res.clearCookie("registrarionCookie");
        return res.status(200).json({ message: "Student registered successfully" });
 
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
 
export default registerStudentsController;