import teachersModel from "../models/teachers.js";

const teachersController = {};

//SELECT

teachersController.getTeachers = async (req, res) => {
    try {
        const teachers = await teachersModel.find();
        return res.status(200).json(teachers);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server errror" });
    }
};
//UPDATE

teachersController.updateTeacher = async (req, res) => {
    try {
         let {
            name,
            lastName,
            email,
            password,
            phone,
            hireDate,
            isActive,
            isVerified,
            loginAttemps,
            timeOut,
        } = req.body;

        //validaciones 
        name = name?.trim();
        email = email?.trim();

        //valores requires
        if (!name || !email || password){
        }
        
    //validaciones de fechas

    const teacherUpdated = await teachersModel.findByIdAndUpdate(
        req.params.id,
        {
              name,
            lastName,
            email,
            password,
            phone,
            hireDate,
            isActive,
            isVerified,
            loginAttemps,
            timeOut,
        },
        { new: true },
    );

    if (!teacherUpdated){
        return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({message: "Teacher updated successfully"});
}catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internal server error"});
}
};

//DELETE
teachersController.deleteTeacher = async (req, res) => {
    try {
        const teacherDeleted = await teachersModel.findByIdAndDelete(req.params.id);

        if (!teacherDeleted) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default teachersController;