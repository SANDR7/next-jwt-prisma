/* eslint-disable import/no-anonymous-default-export */
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const allPosts = await prisma.posts.findMany({
        select: {
          title: true,
          description: true,
          User: {
            select: {
              username: true,
              email: true
            }
          }
        }
      });

      res.json(allPosts);
    } catch {
      res.json({ message: 'something' });
    }
  }
  res.json({ message: 'something' });
};
