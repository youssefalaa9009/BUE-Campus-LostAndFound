export type ItemMode = "lost" | "found";

export type HeldAt = "finder" | "security";

export type Item = {
    id: string;
    mode: ItemMode;
    category: string;
    name: string;
    description: string;
    locationId: string;
    happenedAt: Date;
    heldAt?: HeldAt;
    photos: string[];
};
