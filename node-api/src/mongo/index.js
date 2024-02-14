import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  mongoose.connection.once("open", () => console.log("DB connected successfully"));
  return mongoose.connect(
    // `mongodb+srv://${process.env.DB_LINK}?retryWrites=true&w=majority`,
    `${process.env.DB_LINK}`,
    { keepAlive: true }
  );
};
 