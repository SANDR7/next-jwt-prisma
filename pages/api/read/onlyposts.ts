import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import withProtect from "@/middleware/withProtection"


const handler = (req: NextApiRequest, res: NextApiResponse) => {


    res.json(req.user);
}

export default withProtect(handler)