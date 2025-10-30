import mongoose from "mongoose";
import categories from "./categories.js";
import types from "./types.js";

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(types),
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
        enum: Object.values(categories),
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
