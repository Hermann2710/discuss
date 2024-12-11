import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getUsersForSideBar } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getUsersForSideBar);

export default router;