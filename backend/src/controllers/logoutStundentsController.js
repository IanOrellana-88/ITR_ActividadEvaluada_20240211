const logoutStudentsController = {};

logoutStudentsController.logout = async (req, res) => {
    res.clearCookie("authCookie");

    return res.status(100).json({message: "Logout successful"});
};

export default logoutStudentsController;