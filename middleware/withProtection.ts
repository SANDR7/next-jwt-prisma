import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

const withProtect = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = req;

    const jwtToken = cookies.NextJWT;

    if (!jwtToken)
      return res.status(401).json({ message: 'Please log in to get access' });

    try {
      const decoded: any = verify(
        jwtToken,
        process.env.JWT_SECRET_ACCESS_TOKEN as string
      );

      const currentUser = prisma.user.findFirst({
        where: {
          id: decoded?.id
        }
      });

      if (!currentUser)
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exist'
        });

      req.user = decoded;

      return handler(req, res);
    } catch {
      return res.status(401).json({
        success: false,
        message: 'You are not authenticated to view this data'
      });
    }
  };
};

export default withProtect;
