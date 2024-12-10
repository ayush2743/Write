import z from "zod";


export const signUpBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const signInBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const postBlogBody = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string()
})

export const updateBlogBody = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
})

export const deleteBlogBody = z.object({
    id: z.string()
})


export type SignUpBody = z.infer<typeof signUpBody>
export type SignInBody = z.infer<typeof signInBody>
export type PostBlogBody = z.infer<typeof postBlogBody>
export type UpdateBlogBody = z.infer<typeof updateBlogBody> 
export type DeleteBlogBody = z.infer<typeof deleteBlogBody>