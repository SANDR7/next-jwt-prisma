/* eslint-disable import/no-anonymous-default-export */
import prisma from '@/lib/prisma';
import withProtect from '@/middleware/withProtection';
import { User } from '@prisma/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user: User;
  }
}

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    select: {
      email: true,
      username: true,
      role: true,
      posts: true
    }
  });

  return res.status(200).json({ ...user, success: true });
};

export default withProtect(handler);
