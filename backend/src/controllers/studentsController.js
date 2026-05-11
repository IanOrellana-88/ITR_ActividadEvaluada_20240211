import studentsModel from "../models/students.js";

const studentsController = {};

//SELECT

studentsController.getStudents = async (req, res) => {
    try {
        const studens = await studentsModel.find();
        return res.status(200).json(studens);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server errror" });
    }
};
//UPDATE

studentsController.updateStudent = async (req, res) => {
    try {
         let {
            name,
            lastName,
            email,
            password,
            birthdate,
            specialty,
            carnet,
            phone,
            isVerified,
            loginAttemps,
            timeOut,
        } = req.body;

        //validaciones 
        name = name?.trim();
        email = email?.trim();

        //valores requires
        if (!name || !email || password){
            return res.status (400).json({ message: "Name, email and password are required" });
        }
        
    //validaciones de fechas

    const studentUpdated = await studentsModel.findByIdAndUpdate(
        req.params.id,
        {
             name,
            lastName,
            email,
            password,
            birthdate,
            specialty,
            carnet,
            phone,
            isVerified,
            loginAttemps,
            timeOut,
        },
        { new: true },
    );

    if (!studentUpdated){
        return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({message: "Student updated successfully"});
}catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internal server error"});
}
};

//DELETE
studentsController.deleteStudent = async (req, res) => {
    try {
        const studentDeleted = await studentsModel.findByIdAndDelete(req.params.id);

        if (!studentDeleted) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default studentsController;