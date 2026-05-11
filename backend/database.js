import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.DB_URI);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected successfully");
});

connection.on("disconnected", (error) => {
    console.log ("DB is disconnected" + error);
});

connection.on("error", (error) => { 
    console.log("DB connection error: " + error);
});


