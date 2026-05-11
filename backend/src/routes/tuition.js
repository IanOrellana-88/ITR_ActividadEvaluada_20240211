import express from "express";
import tuitionController from "../controllers/tuitionController.js";

const router = express.Router();

router.route("/").get(tuitionController.getTuition);
router.route("/").post(tuitionController.createTuition);
router.route("/:id").delete(tuitionController.deleteTuition);
router.route("/:id").put(tuitionController.updateTuition);

export default router;

