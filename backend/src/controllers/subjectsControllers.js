import subjectModel from "../models/subjects.js";

//Select

const subjectsController = {};

subjectsController.getSubjects = async (req, res) => {
    const subjects = await subjectModel.find();
    return res.status(200).json(subjects);
};

//Insert
subjectsController.createSubject = async (req, res) => {
    const { subjectName, teacher_id, isAvailable } = req.body;
    const newSubject = new subjectModel({ subjectName, teacher_id, isAvailable });
    await newSubject.save();

    res.json({ message: "Subject created successfully" });
};

//delete
subjectsController.deleteSubject = async (req, res) => {
    await subjectModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted successfully" });
};

//update
subjectsController.updateSubject = async (req, res) => {
    const { subjectName, teacher_id, isAvailable } = req.body;
    await subjectModel.findByIdAndUpdate(req.params.id, { subjectName, teacher_id, isAvailable });
    res.json({ message: "Subject updated successfully" });
};

export default subjectsController;
