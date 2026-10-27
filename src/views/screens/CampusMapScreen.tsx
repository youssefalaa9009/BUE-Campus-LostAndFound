import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import colors from "@/constants/colors";
import { useCampusMapViewModel } from "@/viewmodels/useCampusMapViewModel";

export default function CampusMapScreen(){
    const vm = useCampusMapViewModel();

    return (
        <SafeAreaView className="flex-1 bg-mapBg">

        {/*Map area*/}
        <View className="flex-1">

            {/* roads: fixed positions */}
            <View className="absolute top-0 bottom-0 left-[47%] w-[5%] bg-white" />
            <View className="absolute left-0 right-0 top-[36%] h-[3%] bg-white" />
            <View className="absolute left-0 right-0 top-[59%] h-[3%] bg-white" />

            {/* buildings: positions come from data*/}
            {vm.buildings.map((b) => (
                <View
                    key={b.id}
                    className="absolute bg-white rounded-2xl border border-line p-2"
                    style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
                >
                    <Text className="text-xs font-semibold text-ink">{b.label}</Text>
                </View>
            ))}

            {/* pins: one per found item, centred on its building */}
            {vm.pins.map((pin) => {
                const size = pin.isSelected ? 52 : 40;
                return (
                    <Pressable
                        key={pin.id}
                        onPress={() => vm.selectPin(pin.id)}
                        className={`absolute rounded-full bg-primary items-center justify-center ${pin.isSelected ? "border-4 border-mint" : "border-2 border-white"}`}
                        style={{
                            left: `${pin.building.x + pin.building.w / 2}%`,
                            top: `${pin.building.y + pin.building.h / 2}%`,
                            width: size,
                            height: size,
                            marginLeft: -size /2,
                            marginTop: -size /2,
                        }}
                    >
                        <pin.icon size={18} color="white" />
                    </Pressable>
                );
            })}
        </View>

        {/*top ( back and search bar)*/}
        <View className="absolute top-16 left-5 right-5 gap-3">
            <View className="flex-row gap-3">
                <Pressable onPress={vm.goBack} className="size-12 rounded-2xl bg-white items-center justify-center">
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

                <Text className="text-sm font-semibold text-ink">{vm.foundCount} found items - last 7 days</Text>

            </View>

        </View>

        {/* ITEM CARD: shows the selected pin's item */}
        {vm.selectedCard && (
            <View className="absolute left-4 right-4 bottom-24 bg-white rounded-3xl p-4 gap-4 shadow-lg">

                {/* little drag handle */}
                <View className="self-center w-10 h-1 rounded-full bg-line" />

                {/* thumbnail + text */}
                <View className="flex-row items-center gap-4">
                    <View className="size-16 rounded-2xl bg-mint items-center justify-center">
                        <vm.selectedCard.icon size={28} color={colors.primary} />
                    </View>
                    <View className="flex-1 gap-1">
                        <Text className="text-base font-semibold text-ink">{vm.selectedCard.name}</Text>
                        <Text className="text-sm text-muted">{vm.selectedCard.place} - {vm.selectedCard.time}</Text>
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
