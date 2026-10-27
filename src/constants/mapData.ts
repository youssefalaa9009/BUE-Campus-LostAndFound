export const MAP_BUILDINGS = [
    { id: "C",          label: "Main building", x: 6,  y: 18, w: 38, h: 15 },
    { id: "SLC",        label: "SLC (Library)", x: 56, y: 16, w: 38, h: 12 },
    { id: "A",          label: "Engineering",   x: 6,  y: 42, w: 36, h: 15 },
    { id: "food-court", label: "Food court",    x: 58, y: 44, w: 34, h: 9  },
    { id: "sports",     label: "Sports area",   x: 6,  y: 63, w: 36, h: 12 },
    { id: "D",          label: "Lecture halls", x: 54, y: 62, w: 40, h: 12 },
];

// Fake found items for the mockup. buildingId links each item to a block above.
export const FOUND_ITEMS = [
    { id: "1", name: "Car keys, blue tag", category: "keys",       buildingId: "food-court", time: "40 min ago" },
    { id: "2", name: "Student ID card",    category: "id-card",    buildingId: "SLC",        time: "2 h ago" },
    { id: "3", name: "Casio calculator",   category: "calculator", buildingId: "A",          time: "Yesterday" },
    { id: "4", name: "White earphones",    category: "earphones",  buildingId: "D",          time: "3 days ago" },
    { id: "5", name: "Black wallet",       category: "wallet",     buildingId: "sports",     time: "5 days ago" },
];
