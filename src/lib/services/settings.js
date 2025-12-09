import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/settings.json');

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Return defaults if file missing
        return {
            sellingPrice: 0,
            costPrice: 0,
            adSpend: 0,
            shipping: 0
        };
    }
}

async function writeDb(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function getSettings() {
    return await readDb();
}

export async function updateSettings(newSettings) {
    await writeDb(newSettings);
    return newSettings;
}
