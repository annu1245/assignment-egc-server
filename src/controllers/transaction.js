import Transaction from "../model/transactions.js";
import ApiError from "../utils/ApiError.js";
import { createTransactionValidator, transactionIdValidator, updateTransactionValidator } from "../utils/validator.js";
import validator from "validator";

export async function getTransation(req, res) {
    try {
        const transactions = await Transaction.find();
        return res.success(200, "All Transactions", transactions);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, error.message);
    }
}

export async function getTransactionById(req, res) {
    try {
      const { id } = req.params;
      transactionIdValidator(id);

      const transation = await Transaction.findById(id);
       if (!transation) {
        throw new ApiError(404, "Transaction not found");
    }
      return res.success(200, "Transaction", transation);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, error.message);
    }
}

export async function createTransaction(req, res) {
    const { type, amount, description, category, date } = req.body;
    createTransactionValidator(req.body);

    try {
        const transation = await Transaction.create({
            type,
            amount,
            description,
            category,
            date,
        });
        return res.success(200, "Transaction created", transation);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, error.message);
    }
}

export async function updateTransaction(req, res) {
    const { id } = req.params;
    updateTransactionValidator(req);
    const { amount, description, category, date } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
        amount,
        description,
        category,
        date,
    }, { new: true });

    if (!updatedTransaction) {
        throw new ApiError(404, "Transaction not found");
    }
    return res.success(200, "Transaction updated", updatedTransaction);
}

export async function deleteTransaction(req, res) {
    const { id } = req.params;
    transactionIdValidator(id);

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
        throw new ApiError(404, "Transaction not found");
    }
    return res.success(200, "Transaction Deleted Successfully");
}
