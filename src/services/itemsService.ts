// MODEL: where items come from and where they are saved.
// Phase 1 keeps them in memory (sample data below). Phase 2 swaps the inside of these
// functions for a real database; the screens and viewmodels don't change.

import { Item } from "@/models/item";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function ago(ms: number) {
    return new Date(Date.now() - ms);
}

// Sample data for the prototype
let items: Item[] = [
    { id: "1", mode: "found", category: "keys",       name: "Car keys, blue tag", description: "", locationId: "food-court", happenedAt: ago(40 * MINUTE), heldAt: "finder",   photos: [] },
    { id: "2", mode: "found", category: "id-card",    name: "Student ID card",    description: "", locationId: "SLC",        happenedAt: ago(2 * HOUR),    heldAt: "security", photos: [] },
    { id: "3", mode: "found", category: "calculator", name: "Casio calculator",   description: "", locationId: "A",          happenedAt: ago(26 * HOUR),   heldAt: "finder",   photos: [] },
    { id: "4", mode: "found", category: "earphones",  name: "White earphones",    description: "", locationId: "D",          happenedAt: ago(3 * DAY),     heldAt: "security", photos: [] },
    { id: "5", mode: "found", category: "wallet",     name: "Black wallet",       description: "", locationId: "sports",     happenedAt: ago(5 * DAY),     heldAt: "security", photos: [] },
];

// Found items from the last `days` days (the Campus map shows the last 7)
export function getFoundItems(days = 7): Item[] {
    const since = Date.now() - days * DAY;
    return items.filter((item) => item.mode === "found" && item.happenedAt.getTime() >= since);
}

// Save a new report and return it with its id
export function createItem(newItem: Omit<Item, "id">): Item {
    const item: Item = { ...newItem, id: Date.now().toString() };
    items = [...items, item];
    return item;
}
