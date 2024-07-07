import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const { title, description, imageUrl } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });
    res.status(201).json(post);
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
};
