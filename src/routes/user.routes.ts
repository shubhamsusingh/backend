import { Router } from "express";
// import { registerUser} from "../controllers/user.controller";
import { registerUser } from "../controllers/userController";
import { login } from "../controllers/userController";

const router = Router();

// POST /api/users/register
router.post("/register", registerUser);
router.post("/login",login);

// GET /api/users
// router.get("/", getUsers);

export default router;
