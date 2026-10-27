import { View, Text, ScrollView, Pressable, TextInput, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {X, Camera, MapPin} from "lucide-react-native";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import CameraModal from "@/views/components/CameraModal";
import colors from "@/constants/colors";
import { useReportItemViewModel } from "@/viewmodels/useReportItemViewModel";

export default function ReportItemScreen() {
    const vm = useReportItemViewModel();

    return (
        <SafeAreaView className="flex-1 bg-surface">
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pb-10 gap-6">

            {   /* 1. Header: X button + "Report an Item" */

            <View className= "flex-row items-center gap-3 pt-2">

                    <Pressable className="size-11 rounded-xl bg-white border border-line items-center justify-center" onPress={vm.close}>
                    <X size={20} color={colors.ink} />
                    </Pressable>
                    <Text className="text-2xl font-bold text-ink">Report an item</Text>
            </View>


            }


            {   /* 2. Toggle: "I lost something" | "I found something" */

            <View className="flex-row bg-line rounded-2xl p-1">
                <Pressable className={`flex-1 py-3 rounded-xl items-center ${vm.mode ==="lost" ? "bg-white" : ""}`} onPress={() => vm.setMode("lost")}>
                    <Text className={`font-semibold ${vm.mode ==="lost" ? "text-ink" : "text-ink/50"}`}>I lost something</Text>
                </Pressable>

                <Pressable className={`flex-1 py-3 rounded-xl items-center ${vm.mode ==="found" ? "bg-white" : ""}`} onPress={() => vm.setMode("found")}>
                    <Text className={`font-semibold ${vm.mode ==="found" ? "text-ink" : "text-ink/50"}`}>I found something</Text>
                </Pressable>


            </View>

            }

          {/* 3. Photos: thumbnails + "Add photo" box */
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
}


            {/* 4. "Category" label + 6 tiles */
            <View className="gap-3">
                <Text className="font-semibold text-ink">Category</Text>
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

            }

            {/* 5. "Item name" label + TextInput */

            <View className="gap-3">
                <Text className= "font-semibold text-ink">Item Name</Text>
                <TextInput
                value={vm.itemName}
                onChangeText={vm.setItemName}
                placeholder="e.g. Car keys with a blue tag"
                placeholderTextColor={colors.muted}
                className="bg-white border border-line rounded-3xl px-4 h-14 text-ink">
                </TextInput>
            </View>

            }

            {/* 6. "Description (optional)" label + multiline TextInput */
            <View className="gap-3">
                <Text className="font-semibold text-ink">Description (Optional)</Text>
                <TextInput
                value={vm.description}
                onChangeText={vm.setDescription}
                placeholder="Describe the item in more detail.."
                placeholderTextColor={colors.muted}
                textAlignVertical="top"
                multiline
                className="bg-white border border-line rounded-3xl h-24 px-4 py-3 text-ink"
                >
                </TextInput>

            </View>

            }

            {/* 7. "When did you find it?" + chips */
            <View className="gap-3">
                <Text className="font-semibold text-ink"> {vm.mode === "found" ? "When did you find it?" : "When did you lose it?"}</Text>
                <Pressable
                onPress={vm.openPicker}
                className="bg-white border border-line rounded-3xl h-14 px-4 justify-center">
                    <Text className="text-ink">{vm.dateLabel}</Text>
                </Pressable>
                {Platform.OS === "ios" && vm.showPicker && (<DateTimePicker themeVariant="light" accentColor={colors.primary} value={vm.foundAt} mode="datetime" display="spinner" maximumDate={new Date()} onValueChange={(event ,pickedDate) => vm.setFoundAt(pickedDate)} />)}
            </View>

            }

            {/* 8. Where did you find it? + pin button */
            <View className="gap-3">
                <Text className="font-semibold text-ink">{vm.mode === "found" ? "Where did you find it?" : "Where did you lose it?"}</Text>

                <View className="flex-row gap-3">
                    <TextInput
                    value={vm.location}
                    onChangeText={vm.setLocation}
                    placeholder="Search campus locations"
                    placeholderTextColor={colors.muted}
                    className="flex-1 bg-white border border-line rounded-3xl h-14 px-4 text-ink">
                    </TextInput>
                    <Pressable
                    onPress={() => {}}
                    className="size-14 rounded-3xl bg-mint items-center justify-center"
                    >
                    <MapPin size={22} color={colors.primary}/>
                    </Pressable>
                </View>

                {vm.showSuggestions && vm.matches.length > 0 && (
                <View className="bg-white border border-line rounded-3xl overflow-hidden">
                    {vm.matches.slice(0,5).map((place) => (
                        <Pressable
                        key={place.id}
                        onPress={() => vm.setLocation(place.name)}
                        className="px-4 py-3"
                        >
                            <Text className="text-ink">{place.name}</Text>
                            <Text className="text-sm text-muted">{place.detail}</Text>
                        </Pressable>
                    ))}
                </View>
                )}
            </View>

            }



            {/* 9. Where is the item now? (2 options) only if it is found (not lost) */}

            {vm.mode === "found" && (
                <View className="gap-3">
                    <Text className="font-semibold text-ink">Where is the item now?</Text>
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




            {/* 10. Two quick tips card */
            <View className="border border-line bg-white gap-3 rounded-3xl px-4 py-3">
                <Text className="font-semibold text-ink">Two quick tips</Text>

                <Text className="text-sm text-muted">Don't show names, card numbers, or other details in photos. The owner will prove it's theirs with those.</Text>
                <Text className="text-sm text-muted">Wallets, phones, and laptops are safest at the security desk.</Text>
            </View>


            }


            {/* 11. Submit button (cut off at the bottom) */

            <View className="border border-line bg-warning gap-3 rounded-3xl px-4 py-3">
                <Text className="font-semibold text-ink">Security Question</Text>
                <Text className="text-sm text-muted">Ask something only the owner would know, like a sticker, engraving or something that only the owner of this item may know. They must answer correctly before they can claim it.</Text>
                <TextInput
                value={vm.securityQuestion}
                onChangeText={vm.setSecurityQuestion}
                placeholder="e.g. What's attached to the keyring"
                placeholderTextColor={colors.muted}
                className="bg-white border border-line rounded-3xl h-14 px-4 text-ink"
                >
                </TextInput>

                <TextInput
                value={vm.securityAnswer}
                onChangeText={vm.setSecurityAnswer}
                placeholder="Answer (only you can see this)"
                placeholderTextColor={colors.muted}
                className="bg-white border border-line rounded-3xl h-14 px-4 text-ink"
                >
                </TextInput>
            </View>

            }


            {//post found item Button
            <Pressable onPress={() => {}} className="bg-primary rounded-3xl h-14 items-center justify-center">
            <Text className="text-white font-semibold text-lg">Post item</Text>
            </Pressable>

}


            </ScrollView>

            <CameraModal
            visible={vm.cameraOpen}
            photoCount={vm.photos.length}
            onCapture={vm.addPhoto}
            onClose={vm.closeCamera}
            maxPhotos={vm.maxPhotos}
            ></CameraModal>
        </SafeAreaView>
    )
}
