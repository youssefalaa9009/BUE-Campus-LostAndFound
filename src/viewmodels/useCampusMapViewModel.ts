import { useState } from "react";
import { router } from "expo-router";
import { MAP_BUILDINGS } from "@/constants/mapData";
import { CATEGORIES } from "@/constants/categories";
import { getFoundItems } from "@/services/itemsService";

function timeAgo(date: Date) {
    const minutes = Math.round((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? "Yesterday" : `${days} days ago`;
}

export function useCampusMapViewModel() {
    const foundItems = getFoundItems();
    const [selectedId, setSelectedId] = useState("");

    const pins = foundItems.flatMap((item) => {
        const building = MAP_BUILDINGS.find((b) => b.id === item.locationId);
        const category = CATEGORIES.find((c) => c.id === item.category);
        if (!building || !category) return [];
        return [{
            id: item.id,
            building,
            icon: category.icon,
            isSelected: item.id === selectedId,
        }];
    });

    const selectedItem = foundItems.find((i) => i.id === selectedId);
    const selectedBuilding = MAP_BUILDINGS.find((b) => b.id === selectedItem?.locationId);
    const selectedCategory = CATEGORIES.find((c) => c.id === selectedItem?.category);
    const selectedCard = selectedItem && selectedBuilding && selectedCategory
        ? {
            name: selectedItem.name,
            place: selectedBuilding.label,
            time: timeAgo(selectedItem.happenedAt),
            icon: selectedCategory.icon,
        }
        : null;

    return {
        buildings: MAP_BUILDINGS,
        pins,
        foundCount: foundItems.length,
        selectedCard,
        selectPin: setSelectedId,
        goBack: () => router.back(),
    };
}
