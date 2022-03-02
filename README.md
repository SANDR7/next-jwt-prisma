This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the install dependencies:

```bash
npm i
# or
npm install
```

Rename `.env.example` to `.env`.
And fill in the missing variables 

Initialize prisma database
```bash
npm run p:push
# and
npm run p:generate
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The open routes are:
- `/` 
- `/register` 
- `/login` 

Protected routes are:
- `/dashboard/user`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

This repository uses also [Prisma](https://prisma.io/), you can take a look at the following links:

- [Docs](https://prisma.io/docs) - General guides
- [Prisma/client](https://www.prisma.io/docs/concepts/components/prisma-client) - Query data from mysql