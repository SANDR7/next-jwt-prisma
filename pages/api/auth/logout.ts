/* eslint-disable import/no-anonymous-default-export */
import apiMessage from '@/constants/ApiMessage';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookies } = req;

  const jwtToken = cookies.NextJWT;

  if (!jwtToken) return res.json(apiMessage('You are already logged out'));

  const serialized = serialize('NextJWT', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1,
    path: '/'
  });

  res.setHeader('Set-Cookie', serialized);
  res.status(200).json(apiMessage('Successfully logged out'));
};
