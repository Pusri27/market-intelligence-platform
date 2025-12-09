"use server";

import { revalidatePath } from "next/cache";
import { addToWatchlist, removeFromWatchlist } from "@/lib/services/watchlist";
import { watchlistActionSchema, settingsSchema } from "@/lib/schema";
import fs from 'fs/promises';
import path from 'path';

export async function toggleWatchlistAction(productId, isAdding) {
    // 1. Validate Input (Senior Requirement)
    const validation = watchlistActionSchema.safeParse({ productId });

    if (!validation.success) {
        return { success: false, error: "Invalid Product ID" };
    }

    try {
        // 2. Call Service Layer (Senior Requirement)
        if (isAdding) {
            await addToWatchlist(productId);
        } else {
            await removeFromWatchlist(productId);
        }

        // 3. Revalidate Cache (Next.js Requirement)
        revalidatePath("/watchlist");
        revalidatePath(`/products/${productId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Database Error" };
    }
}

// Settings Server Action
export async function saveSettingsAction(prevState, formData) {
    const rawData = {
        sellingPrice: parseFloat(formData.get("sellingPrice")),
        costPrice: parseFloat(formData.get("costPrice")),
        adSpend: parseFloat(formData.get("adSpend")),
        shipping: parseFloat(formData.get("shipping")),
    };

    // Validate
    const validated = settingsSchema.safeParse(rawData);

    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    try {
        await updateSettings(validated.data);
        revalidatePath("/settings");
        // We can also revalidate the dashboard if it uses these settings
        revalidatePath("/");
        return { success: true, message: "Settings Saved!" };
    } catch (e) {
        return { success: false, message: "Failed to save." };
    }
}
