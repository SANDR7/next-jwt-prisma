import withProtect from '@/middleware/withProtection';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.json(req.user);
};

export default withProtect(handler);
