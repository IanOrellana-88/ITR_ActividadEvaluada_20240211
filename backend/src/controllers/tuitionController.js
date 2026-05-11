import tuitionModel from "../models/tuition.js";

const tuitionController = {};

//Select

tuitionController.getTuition = async (req, res) => {
    const tuition = await tuitionModel.find();
    return res.status(200).json(tuition);
};

//Insert
tuitionController.createTuition = async (req, res) => {
    const { student_id, amount, paymentDate, method, status, ReferenceNumber } = req.body;
    const newTuition = new tuitionModel({ student_id, amount, paymentDate, method, status, ReferenceNumber });
    await newTuition.save();

    res.json({ message: "Tuition created successfully" });
};

//delete
tuitionController.deleteTuition = async (req, res) => {
    await tuitionModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Tuition deleted successfully" });
};

//update
tuitionController.updateTuition = async (req, res) => {
    const { student_id, amount, paymentDate, method, status, ReferenceNumber } = req.body;
    await tuitionModel.findByIdAndUpdate(req.params.id, { student_id, amount, paymentDate, method, status, ReferenceNumber });
    res.json({ message: "Tuition updated successfully" });
};

export default tuitionController;
