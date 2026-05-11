//*campos
//name,
//lastname,
//email,
//password,
//phone,
//hireDate,
//isActive,
//isVerified,
//loginAttemps,
//timeOut
//*

import { Schema,model } from "mongoose";
const teachersSchema = new Schema (
    {
        name: { type: String},
        lastName: {type: String},
        email: {type: String, },
        password: {type: String},
        phone: {type: String},
        hireDate: {type: Date},
        isActive: {type: Boolean},
        isVerified: {type: Boolean},
        loginAttemps: {type: Number},
        timeOut: {type: Date}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Teachers", teachersSchema);
