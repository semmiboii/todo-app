import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      dbName: "todo",
    });

    if (conn) {
      console.log("MongoDB Connected");
    } else {
      console.log("Connection To DB Failed");
    }
  } catch (err) {
    console.log("Couldn't Connect to DB");
    console.log(err);
  }
};
