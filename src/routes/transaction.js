import { Router } from "express";
import { createTransaction, getTransation } from "../controllers/transaction.js";

const router = Router();

router.get('/', getTransation);
router.post('/create', createTransaction);

export default router;

