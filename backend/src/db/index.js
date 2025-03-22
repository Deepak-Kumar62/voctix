import mongoose from "mongoose";



const connectDatabase = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MONGODB connected !! DB host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDatabase;
