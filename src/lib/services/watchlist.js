import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/watchlist.json');

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeDb(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function getWatchlistIds() {
    return await readDb();
}

export async function addToWatchlist(productId) {
    const ids = await readDb();
    if (!ids.includes(productId)) {
        const newIds = [...ids, productId];
        await writeDb(newIds);
        return newIds;
    }
    return ids;
}

export async function removeFromWatchlist(productId) {
    const ids = await readDb();
    const newIds = ids.filter(id => id !== productId);
    await writeDb(newIds);
    return newIds;
}
