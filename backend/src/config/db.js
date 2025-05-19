import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const mongodbConnection = async () => {
  console.log(process.env.DB_CONNECTION_STRING);
    
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}/${DB_NAME}`
    );
    console.log(
      `Database connected successfully ✅|| DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection failed 🔴 ${error}`);
    process.exit(1);
  }
};

export default mongodbConnection