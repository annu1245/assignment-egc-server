import Transaction from '../model/transactions.js';
import ApiError from '../utils/ApiError.js';

export async function getTransation (req, res) {
  try {
    const transactions = await Transaction.find();
    res.success(200, "All Transactions", transactions);
  } catch (error) {
    console.log(error)
    throw new ApiError(500, error.message)
  }
}