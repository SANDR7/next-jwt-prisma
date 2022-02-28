/* eslint-disable import/no-anonymous-default-export */
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../middleware/withProtection";

const handler = (req: NextApiRequest, res: NextApiResponse) => {

  return res.status(200).json({ somedata: "secret" });
};

export default withProtect(handler);
