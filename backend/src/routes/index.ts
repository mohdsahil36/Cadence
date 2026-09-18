import { Router } from "express";
import activityRoutes from "./activity.route.js";

const router = Router();

router.use(activityRoutes);

export default router;
