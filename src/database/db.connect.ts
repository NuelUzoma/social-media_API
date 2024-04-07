import mongoose, { ConnectOptions } from "mongoose";
const MongoStore = require("connect-mongo");
import CONFIG from "../config/mongo.config";


// Constructing the MongoDB connection URI
const uri: string = `mongodb://${CONFIG.host}/${CONFIG.database}`;

// Additional options for the MongoDB connection (optional)
const options = {
} as ConnectOptions;

export const sessionStore = MongoStore.create({
    mongoUrl: uri
});

mongoose.connect(uri, options)
.then(() => {
    console.log("Connected to MongoDB Successfully");
})
.catch((err) => {
    console.error(err);
});