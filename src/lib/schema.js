import { z } from "zod";

export const settingsSchema = z.object({
    sellingPrice: z.number().min(0, "Price must be positive"),
    costPrice: z.number().min(0, "Cost must be positive"),
    adSpend: z.number().min(0, "Ad spend must be positive"),
    shipping: z.number().min(0, "Shipping must be positive"),
});

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number().optional(),
    category: z.string(),
});

export const watchlistActionSchema = z.object({
    productId: z.number()
});
