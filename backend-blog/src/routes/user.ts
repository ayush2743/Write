import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { sha256 } from 'hono/utils/crypto';
import { Hono } from 'hono';
import {  signInBody, signUpBody  } from '@ayush27/common-blog';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();


// ------------------- Sign Up ------------------- //
userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signUpBody.safeParse(body);

    if(!success) {
        return c.json({ error: "Invalid Request" }, 400); //Bad Request
    }

    const hashedPassword: any = await sha256(body.password);

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ jwt });

    } catch (e) {
        return c.json({ error: "Error while Signing Up" }, 500);
    }
});



// ------------------- Sign In ------------------- //
userRouter.post('/signin', async (c) => {

    try {

        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = signInBody.safeParse(body);

        if(!success) {
            return c.json({ error: "Invalid Request" }, 400); //Bad Request
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return c.json({ error: "User not found" }, 401); //Unauthorized
        }

        const hashedPassword: any = await sha256(body.password);

        if (user.password !== hashedPassword) {
            return c.json({ error: "Invalid Password" }, 403); //Forbidden
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({ jwt });
    } catch (e) {
        return c.json({ error: "Error while Signing In" }, 500); //Internal Server Error    
    }
});
