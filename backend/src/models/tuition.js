//*campos
//student_id: String,
//amount: Number,
//paymentDate: Date,
//method: String,
//status: String
//ReferenceNumber: String
//*

import { Schema,model } from "mongoose";

const tuitionSchema = new Schema ({
    student_id: { type: String},
    amount: { type: Number},
    paymentDate: { type: Date},
    method: { type: String},
    status: { type: String},
    ReferenceNumber: { type: String}
},
{
    timestamps: true,
    versionKey: false
}
);

export default model("Tuition", tuitionSchema);
