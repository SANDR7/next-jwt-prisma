import apiMessage from '@/constants/ApiMessage';
import prisma from '@/lib/prisma';
import withProtect from '@/middleware/withProtection';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, text } = req.body;

    try {
      const newPost = await prisma.user.update({
        where: {
          id: req.user.id
        },
        data: {
          posts: {
            create: {
              title,
              description: text
            }
          }
        },
        select: {
          username: true,
          posts: {
            select: {
              title: true,
              description: true
            }
          }
        }
      });

      const posts = newPost?.posts;

      res.status(200).json({ posts, user: req.user });
    } catch {
      res.status(500).json(apiMessage('post not created', false, true));
    }
  }

  res.json(req.user);
};

export default withProtect(handler);
