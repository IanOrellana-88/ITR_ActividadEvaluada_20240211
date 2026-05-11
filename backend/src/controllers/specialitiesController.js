import specialitiesModel from "../models/specialities.js";

const specialitiesController = {};

//Select

specialitiesController.getSpecialities = async (req, res) => {
    const specialities = await specialitiesModel.find();
    return res.status(200).json(specialities);
};

//Insert
specialitiesController.createSpeciality = async (req, res) => {
    const { name, isAvailable } = req.body;
    const newSpeciality = new specialitiesModel({ name, isAvailable });
    await newSpeciality.save();

    res.json({ message: "Speciality created successfully" });
};

//delete
specialitiesController.deleteSpeciality = async (req, res) => {
    await specialitiesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Speciality deleted successfully" });
};

//update
specialitiesController.updateSpeciality = async (req, res) => {
    const { name, isAvailable } = req.body;
    await specialitiesModel.findByIdAndUpdate(req.params.id, { name, isAvailable });
    res.json({ message: "Speciality updated successfully" });
};

export default specialitiesController;
