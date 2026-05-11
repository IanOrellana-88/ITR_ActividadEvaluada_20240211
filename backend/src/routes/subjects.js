import express from "express";
import subjectsController from "../controllers/subjectsControllers.js";

const router = express.Router();

router.route("/").get(subjectsController.getSubjects);
router.route("/").post(subjectsController.createSubject);
router.route("/:id").delete(subjectsController.deleteSubject);
router.route("/:id").put(subjectsController.updateSubject);

export default router;
