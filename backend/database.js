import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db_URI);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected successfully");
});

connection.on("disconnected", (err) => {
    console.log ("DB es disconnected" + error);
});

connection.on("error", (errror) => { 
    console.log("DB connection error: " + error);
});
