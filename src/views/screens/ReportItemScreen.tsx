import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Camera, MapPin } from "lucide-react-native";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "@/constants/colors";
import FieldLabel from "@/views/components/FieldLabel";
import FormInput from "@/views/components/FormInput";
import { useReportItemViewModel } from "@/viewmodels/useReportItemViewModel";

export default function ReportItemScreen() {
    const vm = useReportItemViewModel();

    return (
        <SafeAreaView className="flex-1 bg-surface">
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pb-10 gap-6">

                {/* 1. header: x button + "report an item" - youssef241784 */}
                <View className="flex-row items-center gap-3 pt-2">
                    <Pressable onPress={vm.close} className="size-11 rounded-xl bg-white border border-line items-center justify-center">
                        <X size={20} color={colors.ink} />
                    </Pressable>
                    <Text className="text-2xl font-bold text-ink">Report an item</Text>
                </View>

                {/* 2. toggle: "i lost something" | "i found something" - youssef241784 */}
                <View className="flex-row bg-line rounded-2xl p-1">
                    <Pressable onPress={() => vm.setMode("lost")} className={`flex-1 py-3 rounded-xl items-center ${vm.mode === "lost" ? "bg-white" : ""}`}>
                        <Text className={`font-semibold ${vm.mode === "lost" ? "text-ink" : "text-ink/50"}`}>I lost something</Text>
                    </Pressable>
                    <Pressable onPress={() => vm.setMode("found")} className={`flex-1 py-3 rounded-xl items-center ${vm.mode === "found" ? "bg-white" : ""}`}>
                        <Text className={`font-semibold ${vm.mode === "found" ? "text-ink" : "text-ink/50"}`}>I found something</Text>
                    </Pressable>
                </View>

                {/* 3. photos: thumbnails + "add photo" box - youssef241784 */}
                <View className="flex-row gap-3">
                    {vm.photos.map((uri) => (
                        <View key={uri} className="size-28">
                            <View className="size-28 rounded-2xl overflow-hidden bg-mint">
                                <Image source={{ uri }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                            </View>
                            <Pressable
                                onPress={() => vm.removePhoto(uri)}
                                className="absolute -top-2 -right-2 size-6 rounded-full bg-ink items-center justify-center"
                            >
                                <X size={12} color="white" />
                            </Pressable>
                        </View>
                    ))}

                    {vm.canAddPhoto && (
                        <Pressable
                            onPress={vm.openCamera}
                            className="flex-1 h-28 rounded-2xl border border-dashed border-muted items-center justify-center gap-1"
                        >
                            <Camera size={22} color={colors.muted} />
                            <Text className="text-ink/50">Add photo</Text>
                        </Pressable>
                    )}
                </View>

                {/* 4. "category" label + 6 tiles - youssef241784 */}
                <View className="gap-3">
                    <FieldLabel>Category</FieldLabel>
                    <View className="flex-row flex-wrap gap-3">
                        {vm.categories.map((item) => (
                            <Pressable
                                key={item.id}
                                onPress={() => vm.setCategory(item.id)}
                                className={`w-[31%] py-4 rounded-3xl border items-center gap-2 ${vm.category === item.id ? "bg-mint border-primary" : "bg-white border-line"}`}
                            >
                                <item.icon size={22} color={vm.category === item.id ? colors.primary : colors.ink} />
                                <Text className="font-semibold text-ink">{item.label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* 5. "item name" label + textinput - youssef241784 */}
                <View className="gap-3">
                    <FieldLabel>Item Name</FieldLabel>
                    <FormInput
                        value={vm.itemName}
                        onChangeText={vm.setItemName}
                        placeholder="e.g. Car keys with a blue tag"
                    />
                </View>

                {/* 6. "description (optional)" label + multiline textinput - youssef241784 */}
                <View className="gap-3">
                    <FieldLabel>Description (Optional)</FieldLabel>
                    <FormInput
                        value={vm.description}
                        onChangeText={vm.setDescription}
                        placeholder="Describe the item in more detail.."
                        textAlignVertical="top"
                        multiline
                    />
                </View>

                {/* 7. "when did you find it?" + date picker - youssef241784 */}
                <View className="gap-3">
                    <FieldLabel>{vm.mode === "found" ? "When did you find it?" : "When did you lose it?"}</FieldLabel>
                    <Pressable onPress={vm.openPicker} className="bg-white border border-line rounded-3xl h-14 px-4 justify-center">
                        <Text className="text-ink">{vm.dateLabel}</Text>
                    </Pressable>
                    {Platform.OS === "ios" && vm.showPicker && (
                        <DateTimePicker
                            themeVariant="light"
                            accentColor={colors.primary}
                            value={vm.foundAt}
                            mode="datetime"
                            display="spinner"
                            maximumDate={new Date()}
                            onValueChange={(event, pickedDate) => vm.setFoundAt(pickedDate)}
                        />
                    )}
                </View>

                {/* 8. where did you find it? + pin button - youssef241784 */}
                <View className="gap-3">
                    <FieldLabel>{vm.mode === "found" ? "Where did you find it?" : "Where did you lose it?"}</FieldLabel>
                    <View className="flex-row gap-3">
                        <FormInput
                            value={vm.location}
                            onChangeText={vm.setLocation}
                            placeholder="Search campus locations"
                            className="flex-1"
                        />
                        <Pressable onPress={() => {}} className="size-14 rounded-3xl bg-mint items-center justify-center">
                            <MapPin size={22} color={colors.primary} />
                        </Pressable>
                    </View>

                    {vm.showSuggestions && vm.matches.length > 0 && (
                        <View className="bg-white border border-line rounded-3xl overflow-hidden">
                            {vm.matches.slice(0, 5).map((place) => (
                                <Pressable key={place.id} onPress={() => vm.setLocation(place.name)} className="px-4 py-3">
                                    <Text className="text-ink">{place.name}</Text>
                                    <Text className="text-sm text-muted">{place.detail}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                {/* 9. where is the item now? (2 options) only if it is found (not lost) - youssef241784 */}
                {vm.mode === "found" && (
                    <View className="gap-3">
                        <FieldLabel>Where is the item now?</FieldLabel>
                        <View className="flex-row gap-3 items-center justify-center">
                            <Pressable
                                onPress={() => vm.setHeldAt("finder")}
                                className={`flex-1 h-20 px-3 rounded-3xl border items-center justify-center ${vm.heldAt === "finder" ? "bg-primary border-primary" : "bg-white border-line"}`}
                            >
                                <Text className={`text-center ${vm.heldAt === "finder" ? "text-white" : "text-ink"}`}>I have it with me</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => vm.setHeldAt("security")}
                                className={`flex-1 h-20 px-3 rounded-3xl border items-center justify-center ${vm.heldAt === "security" ? "bg-primary border-primary" : "bg-white border-line"}`}
                            >
                                <Text className={`text-center ${vm.heldAt === "security" ? "text-white" : "text-ink"}`}>I left it at the security desk</Text>
                            </Pressable>
                        </View>
                    </View>
                )}

                {/* 10. two quick tips card - youssef241784 */}
                <View className="border border-line bg-white gap-3 rounded-3xl px-4 py-3">
                    <Text className="font-semibold text-ink">Two quick tips</Text>
                    <Text className="text-sm text-muted">Don't show names, card numbers, or other details in photos. The owner will prove it's theirs with those.</Text>
                    <Text className="text-sm text-muted">Wallets, phones, and laptops are safest at the security desk.</Text>
                </View>

                {/* 11. security question - youssef241784 */}
                <View className="border border-line bg-warning gap-3 rounded-3xl px-4 py-3">
                    <Text className="font-semibold text-ink">Security Question</Text>
                    <Text className="text-sm text-muted">Ask something only the owner would know, like a sticker, engraving or something that only the owner of this item may know. They must answer correctly before they can claim it.</Text>
                    <FormInput
                        value={vm.securityQuestion}
                        onChangeText={vm.setSecurityQuestion}
                        placeholder="e.g. What's attached to the keyring"
                    />
                    <FormInput
                        value={vm.securityAnswer}
                        onChangeText={vm.setSecurityAnswer}
                        placeholder="Answer (only you can see this)"
                    />
                </View>

                {/* 12. post found item button - youssef241784 */}
                <Pressable onPress={() => {}} className="bg-primary rounded-3xl h-14 items-center justify-center">
                    <Text className="text-white font-semibold text-lg">Post item</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}
