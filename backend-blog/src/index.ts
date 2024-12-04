import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';


import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
  Variables: {
    userID: string
  }
}>();

app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);


export default app;