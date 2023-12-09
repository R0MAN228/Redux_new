import { z } from "zod";
const message = "Пароль должен содержать 8 символов, цифры, заглавные и строчные буквы"
export const User = z.object({
    email: z.string().email({ message: "Введите корректный email" }),
    password: z.string().min(8, { message }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message, }),
    confirmedPassword: z.string(),
    createdAt: z.number(),
}).superRefine(({ password, confirmedPassword }, ctx) => {
    if (password !== confirmedPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Пароли не совпадают",
            path: ["confirmedPassword"],
        });
    }
})