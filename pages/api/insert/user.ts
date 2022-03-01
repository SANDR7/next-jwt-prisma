/* eslint-disable import/no-anonymous-default-export */
import apiMessage from '@/constants/ApiMessage';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json(apiMessage('Method not allowed', false, true));

  try {
    const { username, password } = req.body;

    const checkTakenUser = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (checkTakenUser) {
      return res.json(apiMessage('User already taken, try again', false, true));
    }

    if (password.length < 6)
      return res.json(apiMessage('password is to short', false, true));

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'USER'
      }
    });
    return res.status(200).json(apiMessage(`${username} saved`));
  } catch {
    return res.status(500).end(apiMessage('User not saved', false, true));
  }
};
