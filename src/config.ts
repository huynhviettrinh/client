import z from "zod";
const configSchema = z.object({
    NEXT_PUBLIC_API_POINT: z.string(),
});
const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_POINT: process.env.NEXT_PUBLIC_API_POINT,
});

if (!configProject.success) {
    console.error(configProject.error.issues);
    throw new Error("Invalid client environment variables (.env)");
}

const envConfig = configProject.data;
export default envConfig;