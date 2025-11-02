import { Router } from "express";
import {
    createTransaction,
    deleteTransaction,
    getCategories,
    getTransactionById,
    getTransation,
    updateTransaction
} from "../controllers/transaction.js";

const router = Router();

router.get('/categories', getCategories);
router.get('/', getTransation);
router.post('/', createTransaction);
router.patch('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/:id', getTransactionById);

export default router;
