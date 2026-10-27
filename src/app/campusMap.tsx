import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import colors from "@/constants/colors";
import { MAP_BUILDINGS, FOUND_ITEMS } from "@/constants/mapData";
import { CATEGORIES } from "@/constants/categories";
import { useState } from "react";


export default function CampusMap(){
    const foundCount = FOUND_ITEMS.length;
    const [selectedId, setSelectedId] = useState("");

    const selectedItem = FOUND_ITEMS.find((i) => i.id === selectedId);
    const selectedBuilding = MAP_BUILDINGS.find((b) => b.id === selectedItem?.buildingId);
    const selectedCategory = CATEGORIES.find((c) => c.id === selectedItem?.category);
    
    return (
        <SafeAreaView className="flex-1 bg-mapBg">

        {/*Map area*/}
        <View className="flex-1">

            {/* roads: fixed positions */}
            <View className="absolute top-0 bottom-0 left-[47%] w-[5%] bg-white" />
            <View className="absolute left-0 right-0 top-[36%] h-[3%] bg-white" />
            <View className="absolute left-0 right-0 top-[59%] h-[3%] bg-white" />

            {/* buildings: positions come from data*/}
             {MAP_BUILDINGS.map((b) => (
                <View
                    key={b.id}
                    className="absolute bg-white rounded-2xl border border-line p-2"
                    style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
        >
            <Text className="text-xs font-semibold text-ink">{b.label}</Text>
        </View>
    ))}

            {/* pins: one per found item, centred on its building */}
            {FOUND_ITEMS.map((item) => {
                const building = MAP_BUILDINGS.find((b) => b.id === item.buildingId);
                const category = CATEGORIES.find((c) => c.id === item.category);
                if (!building || !category) return null;

                const isSelected = item.id === selectedId; 
                const size = isSelected ? 52 : 40;   
                return (
                    <Pressable
                        key={item.id}
                        onPress={() => setSelectedId(item.id)}
                        className={`absolute rounded-full bg-primary items-center justify-center ${isSelected ? "border-4 border-mint" : "border-2 border-white"}`}
                        style={{
                            left: `${building.x + building.w / 2}%`,
                            top: `${building.y + building.h / 2}%`,
                            width: size,
                            height: size,
                            marginLeft: -size /2,
                            marginTop: -size /2,
                        }}
                    >
                        <category.icon size={18} color="white" />
                    </Pressable>
                );
            })}
        </View>

        {/*top ( back and search bar)*/}
        <View className="absolute top-16 left-5 right-5 gap-3">
            <View className="flex-row gap-3">
                <Pressable onPress={() => router.back()} className="size-12 rounded-2xl bg-white items-center justify-center">
                    <ChevronLeft size={22} color={colors.ink}/>
                </Pressable>
                <TextInput
                    placeholder="Search buildings or items"
                    placeholderTextColor={colors.muted}
                    className="flex-1 h-12 bg-white rounded-2xl px-4 text-ink"
                />
            </View>

            {/*found items*/}
            <View className="self-start flex-row items-center gap-2 bg-white rounded-full px-3 py-2">
                <View className="size-2.5 rounded-full bg-primary" />

                <Text className="text-sm font-semibold text-ink">{foundCount} found items - last 7 days</Text>

            </View>

        </View>

        {/* ITEM CARD: shows the selected pin's item */}
        {selectedItem && selectedBuilding && selectedCategory && (
            <View className="absolute left-4 right-4 bottom-24 bg-white rounded-3xl p-4 gap-4 shadow-lg">

                {/* little drag handle */}
                <View className="self-center w-10 h-1 rounded-full bg-line" />

                {/* thumbnail + text */}
                <View className="flex-row items-center gap-4">
                    <View className="size-16 rounded-2xl bg-mint items-center justify-center">
                        <selectedCategory.icon size={28} color={colors.primary} />
                    </View>
                    <View className="flex-1 gap-1">
                        <Text className="text-base font-semibold text-ink">{selectedItem.name}</Text>
                        <Text className="text-sm text-muted">{selectedBuilding.label} - {selectedItem.time}</Text>
                    </View>
                </View>

                {/* buttons */}
                <View className="flex-row gap-3">
                    <Pressable onPress={() => {}} className="flex-1 h-12 rounded-2xl border border-line items-center justify-center">
                        <Text className="font-semibold text-ink">View details</Text>
                    </Pressable>
                    <Pressable onPress={() => {}} className="flex-1 h-12 rounded-2xl bg-primary items-center justify-center">
                        <Text className="font-semibold text-white">Claim this item</Text>
                    </Pressable>
                </View>

            </View>
        )}




        </SafeAreaView>
    )




}