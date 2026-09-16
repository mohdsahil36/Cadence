import express from "express";
import prisma from "./lib/prisma.js";

const app = express();

const PORT = 3001;

app.get("/health", async (req, res) => {
  try {
    // Execute the raw SQL query "SELECT 1" to ask the database to return the value 1.
    const response = await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      database: "connected",
      response,
    });
  } catch (error) {
    console.error("Error :", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
