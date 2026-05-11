import express from "express";
import studentsController from "../controllers/studentsController.js";

const router = express.Router();

router.route("/")
.get(studebtsController.getStudents);

router.route("/id")
.put(studentsController.updateStudent)
.delete(studentsController.deleteStudent);

export default router;