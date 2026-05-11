//*campos
//specialityName: String,
//isAvaliabre: Boolean
//*

import { Schema,model } from "mongoose";

const specialitiesSchema = new Schema ({
    specialityName: { type: String},
    isAvaliabre: {type: Boolean},
},
{
    timestamps: true,
    versionKey: false
}
);

export default model("Specialities", specialitiesSchema);
