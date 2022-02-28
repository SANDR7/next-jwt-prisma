import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const withProtect = (handler: NextApiHandler) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {

    const { cookies } = req;


    const jwtToken = cookies.NextJWT;
    console.log(jwtToken);
    

    if (!jwtToken)
      return res.json({ message: "Please log in to get access1" });

    try {
      const decoded: any = verify(
        jwtToken,
        process.env.JWT_SECRET_ACCESS_TOKEN as string
      );

      const currentUser = prisma.user.findFirst({
        where: {
          id: decoded?.id,
        },
      });

      if (!currentUser)
        return res.json({
          success: false,
          message: "The user belonging to this token no longer exist",
        });


      return handler(req, res);
    } catch {
      return res.json({
        success: false,
        message: "Please log in to get access2",
      });
    }
  };
};

export default withProtect;