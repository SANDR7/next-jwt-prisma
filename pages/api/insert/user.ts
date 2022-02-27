/* eslint-disable import/no-anonymous-default-export */
import prisma from "../../../lib/prisma";
import handleMessage from "../../../constants/ApiMessage";

import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json(handleMessage('Method not allowed', false, true));

    try {
        const { username, password } = req.body;

        const hashedPassword = await hash(password, 10);

        const saveUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: "USER"
            }
        })
        console.log(saveUser);


        res.status(200).json(handleMessage('User saved'))

    } catch {
        res.status(500).end(handleMessage('User not saved', false, true))
    }


}