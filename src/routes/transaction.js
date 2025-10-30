import { Router } from "express";
import { getTransation } from "../controllers/transaction.js";

const router = Router();

router.get('/', getTransation)

export default router;

