import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import mongooseConnect from "./connection.js";
import seedTransaction from "./transactionSeeder.js";

async function runSeeder() {
  try {
    await mongooseConnect();
    console.log("✅ Mongoose database connected successfully.");

    const transactions = await seedTransaction();
    console.log(`✨ Database seeding complete. Inserted ${transactions.length} records.`);

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("❌ A fatal error occurred during seeding or connection:", error.message);
    process.exit(1);
  }
}

runSeeder();
