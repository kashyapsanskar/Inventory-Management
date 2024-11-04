import { Router} from "express";
import { getDashboardMetrics } from "../Controllers/dashboardController";
const router=Router();
router.get("/",getDashboardMetrics); //http://localhost:8000/dashboard
export default router;
