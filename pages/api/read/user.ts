/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {cookies} = req;

    const jwtToken = cookies.NextJWT;

    console.log(jwtToken);
    
    
}