import studentsModel from "../models/students.js";
import jsonwebtoken from "jsonwebtoken";
import brcypt from "bcryptjs";
import { config } from "../config.js";

const loginStudentsController = {};

loginStudentsController.login = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email"});
    }

    try {
        const studentFound = await studentsModel.findOne({ email });
        if (!studentFound) {
            return res.status(400).json({ message: "Student not found" });
        }

        if (studentFound.timeOut && studentFound.timeOut > new Date()) {
            return res.status(403).json({ message: "Account locked. Try again later" });
        }

        const isMatch = await brcypt.compare(password, studentFound.password);

        if (!isMatch) {
            studentFound.loginAttemps = (studentFound.loginAttemps || 0) + 1;

            if (studentFound.loginAttemps >= 5) {
                studentFound.timeOut = new Date(Date.now() + 30 * 60 * 1000);
                studentFound.loginAttemps = 0;
                await studentFound.save();
                return res.status(403).json({ message: "Account locked. Try again later" });
            }
            await studentFound.save();
            return res.status(401).json({ message: "Invalid password" });
        }

        studentFound.loginAttemps = 0;
        studentFound.timeOut = null;
        await studentFound.save();

        const token = jsonwebtoken.sign(
            { id: studentFound._id, userType: "student" },
            config.JWT_secret_key,
            { expiresIn: "30d" }
        );

        res.cookie("authCookie", token);
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default loginStudentsController;