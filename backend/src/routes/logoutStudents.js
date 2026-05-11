import express from "express";
import logoutStudentsController from "../controllers/logoutStundentsController.js";

const router = express.Router();

router.route("/").post(logoutStudentsController.logout);

export default router;