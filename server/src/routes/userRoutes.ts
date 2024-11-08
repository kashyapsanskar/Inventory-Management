import { Router } from "express";
import { getUsers } from "../Controllers/userController";
// import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

export default router;