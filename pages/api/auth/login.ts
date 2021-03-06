/* eslint-disable import/no-anonymous-default-export */
import apiMessage from '@/constants/ApiMessage';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json(apiMessage('Method not allowed', false, true));

  try {
    const { username, password } = req.body as User;

    const findUser = await prisma.user.findFirst({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        password: true
      }
    });
    const verifyPassword = await compare(
      password,
      findUser?.password as string
    );

    if (!verifyPassword)
      res.send(apiMessage('Invalid Credentials', false, true));

    const accessToken = sign(
      {
        username: findUser?.username,
        id: findUser?.id
      },
      process.env.JWT_SECRET_ACCESS_TOKEN as string,
      { expiresIn: '1h' }
    );

    const serialized = serialize('NextJWT', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 10,
      path: '/'
    });

    res.setHeader('Set-Cookie', serialized);

    res.status(200).json(apiMessage('User signed with token'));
  } catch {
    res.json(apiMessage('Not registered', false, true));
  }
};
