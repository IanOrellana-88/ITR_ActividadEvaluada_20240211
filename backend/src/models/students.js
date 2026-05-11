//*campos 
//name: String,
//lastname: String,
//email: String,
//password: String,
//birthdate: Date,
//specialty: String,
//carnet: String,
//phone: String,
//isVerified: Boolean
//loginAttemps: Number,
//timeOut: Date
//*


import { Schema,model } from "mongoose";
const studentsSchema = new Schema (
    {
        name: { type: String},
        lastName: {type: String},
        email: {type: String, },
        password: {type: String},
        birthdate: {type: Date},
        specialty: {type: String},
        carnet: {type: String},
        phone: {type: String},
        isVerified: {type: Boolean},
        loginAttemps: {type: Number},
        timeOut: {type: Date}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Students", studentsSchema);