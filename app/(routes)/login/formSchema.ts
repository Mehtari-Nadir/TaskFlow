import { ZodType, z } from "zod";

type TForm = {
    email: string,
    password: string
};

const formSchema: ZodType<TForm> = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

export default formSchema;