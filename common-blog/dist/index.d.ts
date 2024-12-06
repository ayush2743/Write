import z from "zod";
export declare const signUpBody: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const signInBody: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const postBlogBody: z.ZodObject<{
    title: z.ZodString;
    desciption: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    desciption: string;
    content: string;
}, {
    title: string;
    desciption: string;
    content: string;
}>;
export declare const updateBlogBody: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const deleteBlogBody: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type SignUpBody = z.infer<typeof signUpBody>;
export type SignInBody = z.infer<typeof signInBody>;
export type PostBlogBody = z.infer<typeof postBlogBody>;
export type UpdateBlogBody = z.infer<typeof updateBlogBody>;
export type DeleteBlogBody = z.infer<typeof deleteBlogBody>;
