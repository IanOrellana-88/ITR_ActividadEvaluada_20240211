import express from "express";
import logoutTeachersController from "../controllers/logoutTeachersControllers.js";

const router = express.Router();

router.route("/").post(logoutTeachersController.logout);
export default router;