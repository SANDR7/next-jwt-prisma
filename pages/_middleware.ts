/* eslint-disable import/no-anonymous-default-export */

import { NextResponse } from 'next/server'

import { verify } from 'jsonwebtoken';
import { NextApiRequest } from 'next';


export default async (req: NextApiRequest) => {
    const { cookies } = req;

    const jwtToken = cookies.NextJWT;

    const url = req.url;

    if (url?.includes('/login')) {
        if (jwtToken) {
            try {
                verify(jwtToken, process.env.JWT_SECRET_ACCESS_TOKEN as string);

                return NextResponse.redirect('http://localhost:3000/dashboard/user');

            } catch {
                return NextResponse.next();

            }
        }
    }

    if (url?.includes('/dashboard')) {
        if (jwtToken === undefined) return NextResponse.redirect('http://localhost:3000/login');

        try {
            verify(jwtToken, process.env.JWT_SECRET_ACCESS_TOKEN as string);

            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect('http://localhost:3000/login');
        }
    }

    return NextResponse.next();
}
