import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database connected successfully ${res.connection.host}`.bgYellow.white
    );
  } catch (error) {
    console.log(`Mongodb connection error ${error}`);
  }
};

export default connectDb;
