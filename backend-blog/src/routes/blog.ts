import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { Hono } from 'hono';
import { postBlogBody, updateBlogBody, deleteBlogBody } from '@ayush27/common-blog';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
    Variables: {
        userID: string
    }
}>();



// ------------------- Fetch Specific blog ------------------- //
blogRouter.get('/:id', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const id = c.req.param('id');

        const blog = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ blog });
    } catch (e) {
        return c.json({ error: "Error while fetching blog" }, 500); //Internal Server Error
    }
}); 


blogRouter.use('/post/*', async (c, next) => {

    try {
        const header = c.req.header('Authorization') || '';
        //const token = header.split(' ')[1];
        const token = header;

        if (token) {
            const user = await verify(token, c.env.JWT_SECRET);
            c.set("userID", user.id as string);
            await next();
        } else {
            return c.json({ error: "Unauthorized" }, 401);  //Unauthroized
        }

    } catch (e) {
        return c.json({ error: "Error while authorization" }, 500); //Internal Server Error
    }
});


// ------------------- Create blog ------------------- //
blogRouter.post('/post', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = postBlogBody.safeParse(body);

        if (!success) {
            return c.json({ error: "Please enter valid input" }, 400); //Bad Request
        }

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                description: body.description,
                content: body.content,
                authorId: c.get("userID"),
            }
        })

        return c.json({ blog });

    } catch (e) {
        return c.json({ error: "Error while creating blog" }, 500); //Internal Server Error
    }
});



// ------------------- Update blog ------------------- //
blogRouter.put('/post', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = updateBlogBody.safeParse(body);

        if (!success) {
            return c.json({ error: "Please enter valid input" }, 400); //Bad Request
        }

        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: c.get("userID") 
            },
            data: {
                title: body.title,
                description: body.description,
                content: body.content
            }
        })

        return c.json({ blog });
    } catch (e) {
        return c.json({ error: "Error while updating blog" }, 500); //Internal Server Error
    }
})



// ------------------- Delete blog ------------------- //
blogRouter.delete('/post', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = deleteBlogBody.safeParse(body);

        if (!success) {
            return c.json({ error: "Invalid Request" }, 400); //Bad Request
        }

        const blog = await prisma.post.delete({
            where: {
                id: body.id,
            }
        })

        return c.json({ blog });

    } catch (e) {
        return c.json({ error: "Error while deleting blog" }, 500); //Internal Server Error
    }
});



// ------------------- Fetch all user blogs ------------------- //
blogRouter.get('/post/user-blogs', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const userId = c.get("userID");

        if (!userId) {
            return c.json({ error: "userID not found in context" }, 400); // Bad Request
        }

        const limit = Number(c.req.query("limit")) || 10;
        const offset = Number(c.req.query("offset")) || 0;

        const totalBlogs = await prisma.post.count({
            where: {
                authorId: userId
            }
        });

        const blogs = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: limit,
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return c.json({blogs, totalBlogs});
    } catch (e) {
        return c.json({ error: "Error while fetching blogs" }, 500); //Internal Server Error
    }
});



// ------------------- Fetch all blogs ------------------- //
blogRouter.get('/post/all', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const limit = Number(c.req.query("limit")) || 10;
        const offset = Number(c.req.query("offset")) || 0;

        const totalBlogs = await prisma.post.count();

        const blogs = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: limit,
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return c.json({blogs, totalBlogs});
    } catch (e) {
        return c.json({ error: "Error while fetching blogs" }, 500); //Internal Server Error
    }
});


blogRouter.post('/search', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();
        
        if (!body.search.trim()) {
            return c.json({ blogs: [] });
        }

        const blogs = await prisma.post.findMany({
            where: {
                title:{
                    contains: body.search,
                    mode: 'insensitive',
                }
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }   
        });

        return c.json({blogs});
    } catch (e) {
        return c.json({ error: "Error while fetching blogs" }, 500); //Internal Server Error
    }

});







