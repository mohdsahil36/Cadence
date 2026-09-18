import { Request, Response } from "express";
import { createRepository, createUser } from "../services/activity.service.js";

export async function createRepositoryController(req: Request, res: Response) {
  try {
    const repositoryResponse = await createRepository();

    res.status(201).json(createRepository);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create repository",
    });
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const userResponse = await createUser();

    console.log("Created User :", userResponse);

    res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create user",
    });
  }
}
