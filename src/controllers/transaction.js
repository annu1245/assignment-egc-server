import Transaction from '../model/transactions.js';
import ApiError from '../utils/ApiError.js';
import { createTransactionValidator } from '../utils/validator.js';

export async function getTransation (req, res) {
  try {
    const transactions = await Transaction.find();
    return res.success(200, "All Transactions", transactions);
  } catch (error) {
    console.log(error)
    throw new ApiError(500, error.message)
  }
}

export async function createTransaction (req, res) {
  const {type, amount, description, category, date} = req.body;
  createTransactionValidator(req.body);
  
  const transation = await Transaction.create({
    type, amount, description, category, date
  })
  return res.success(200, "Transaction created", transation);
}