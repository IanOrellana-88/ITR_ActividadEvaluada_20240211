//*campos
//subjectName: String,
//teacher_id: String,
//isAvailable: Boolean
//*

import { Schema,model } from "mongoose";

const subjectsSchema = new Schema ({
    subjectName: { type: String},
    teacher_id: { type: String},
    isAvailable: {type: Boolean},
},
{
    timestamps: true,
    versionKey: false
}
);

export default model("Subjects", subjectsSchema);