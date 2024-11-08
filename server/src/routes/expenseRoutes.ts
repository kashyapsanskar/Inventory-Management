import { Router } from "express";
import { getExpensesByCategory } from "../Controllers/expenseController";
// import { getExpensesByCategory } from "../controllers/expenseController";

const router = Router();

router.get("/", getExpensesByCategory);

export default router;