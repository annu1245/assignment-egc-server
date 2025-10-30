import mongoose from "mongoose";

async function mongooseConnect () {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    if (!connectionInstance) {
      throw new Error("database connection instance error")
    }
  } catch (error) {
    console.log(error)
  }
}

export default mongooseConnect;