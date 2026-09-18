import { Router } from "express";
import {
  createRepositoryController,
  createUserController,
} from "../controller/activity.controller.js";

const router = Router();

router.post("/repositories", createRepositoryController);
router.post("/users", createUserController);

export default router;
