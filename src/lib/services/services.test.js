import { describe, it, expect, vi } from 'vitest';
import { getProducts } from './products';

// Mock the data source mechanism
vi.mock('@/data/products.json', () => ({
    default: [
        { id: 1, name: "Test Product A", category: "Electronics" },
        { id: 2, name: "Test Product B", category: "Home" }
    ]
}));

describe('Product Service (Executive QA)', () => {
    it('should return all products when no query is provided', async () => {
        const products = await getProducts();
        expect(products).toHaveLength(2);
    });

    it('should filter products by name (case-insensitive)', async () => {
        const products = await getProducts('product a');
        expect(products).toHaveLength(1);
        expect(products[0].name).toBe("Test Product A");
    });

    it('should return empty array if no match found', async () => {
        const products = await getProducts('nonexistent');
        expect(products).toHaveLength(0);
    });
});
