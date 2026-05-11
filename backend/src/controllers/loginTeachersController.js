import teachersModel from "../models/teachers.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {config} from "../../config.js";


const loginTeachersController = {};

loginTeachersController.login = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email"});
    }

    try {
        const teacherFound = await teachersModel.findOne({ email });
        if (!teacherFound) {
            return res.status(400).json({ message: "Teacher not found" });
        }

        if (teacherFound.timeOut && teacherFound.timeOut > new Date()) {
            return res.status(403).json({ message: "Account locked. Try again later" });
        }

        const isMatch = await bcrypt.compare(password, teacherFound.password);
        if (!isMatch) {
            teacherFound.loginAttemps = (teacherFound.loginAttemps || 0) + 1;

            if (teacherFound.loginAttemps >= 5) {
                teacherFound.timeOut = new Date(Date.now() + 30 * 60 * 1000);
                teacherFound.loginAttemps = 0;
                await teacherFound.save();
                return res.status(403).json({ message: "Account locked. Try again later" });
            }
            await teacherFound.save();
            return res.status(401).json({ message: "Invalid password" });
        }

        teacherFound.loginAttemps = 0;
        teacherFound.timeOut = null;
        await teacherFound.save();

        const token = jsonwebtoken.sign(
            { id: teacherFound._id, userType: "teacher" },
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
export default loginTeachersController;