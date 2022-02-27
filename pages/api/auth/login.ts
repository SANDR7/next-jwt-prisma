/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";

import apiMessage from "../../../constants/ApiMessage";
import prisma from "../../../lib/prisma";

import { User } from "@prisma/client";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(405).json(apiMessage('Method not allowed', false, true));

    try {
        const { username, password } = req.body as User;

        const findUser = await prisma.user.findFirst({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                password: true
            }
        })
        const verifyPassword = await compare(password, findUser?.password as string);

        if (!verifyPassword) res.send(apiMessage('Invalid Credentials', false, true));

        const accessToken = sign({
            exp: Math.floor(Date.now() / 1000) * 60 * 24 * 30,
            username: findUser?.username,
            id: findUser?.id,
        }, process.env.JWT_SECRET_ACCESS_TOKEN as string);

        const serialized = serialize("NextJWT", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        });

        res.setHeader("Set-Cookie", serialized);

        res.status(200).json(apiMessage('User signed with token'))
        

    } catch {
        res.status(500).json(apiMessage('Something went wrong with the JWT token', false, true))

    }
}