// MODEL: what a lost or found item looks like. Shared by the Report screen and the Campus map.

export type ItemMode = "lost" | "found";

// Where a found item is now ("Where is the item now?" on the Report screen)
export type HeldAt = "finder" | "security";

export type Item = {
    id: string;
    mode: ItemMode;
    category: string;      // id from CATEGORIES, e.g. "keys"
    name: string;
    description: string;
    locationId: string;    // id from CAMPUS_LOCATIONS, e.g. "food-court"
    happenedAt: Date;      // when it was lost or found
    heldAt?: HeldAt;       // only for found items
    photos: string[];      // photo file paths (up to MAX_PHOTOS)
};
