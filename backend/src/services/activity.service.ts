import prisma from "../lib/prisma.js"; // bring the created client so that it can communicate with the database

export async function createRepository() {
  const repository = await prisma.repository.create({
    data: {
      id: "repo_001",
      name: "merchant-gateway",
      owner: "mohdsahil36",
      url: "https://github.com/mohdsahil36/merchant-gateway",
      user: {
        connect: {
          id: "user_001",
        },
      },
    },
  });

  return repository;
}

export async function createUser() {
  const user = await prisma.user.create({
    data: {
      id: "user_001",
      email: "sahil@test.con",
    },
  });
}
