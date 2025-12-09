import productsData from "@/data/products.json";
import fs from 'fs/promises';
import path from 'path';

// In a real app, this would be a DB call (Prisma/Drizzle)
// For this "Senior" demo, we abstract the JSON file reading to look like a DB repo.

export async function getProducts(query = "") {
    // Simulate DB delay
    // await new Promise(resolve => setTimeout(resolve, 100));

    let products = [...productsData];

    if (query) {
        const lowerQuery = query.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    }

    return products;
}

export async function getProductById(id) {
    return productsData.find(p => p.id === parseInt(id)) || null;
}

export async function getProductsByIds(ids) {
    return productsData.filter(p => ids.includes(p.id));
}
