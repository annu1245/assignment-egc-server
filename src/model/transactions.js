import mongoose from "mongoose";
import categories from "./categories";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        enum: categories,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
  timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
