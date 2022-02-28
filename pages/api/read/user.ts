/* eslint-disable import/no-anonymous-default-export */
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../middleware/withProtection";

const handler = (req: any, res: NextApiResponse) => {

  return res.status(200).json({user: req.user });
};

export default withProtect(handler);
