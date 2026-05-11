import express from "express";
import teachersController from "../controllers/teachersController.js";

const router = express.Router();

router.route("/")
.get(teachersController.getTeachers);

router.route("/:id")
.put(teachersController.updateTeacher)
.delete(teachersController.deleteTeacher);

export default router;