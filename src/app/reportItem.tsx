import { View, Text, ScrollView, Pressable, TextInput, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import {X, Camera, MapPin} from "lucide-react-native";
import { CAMPUS_LOCATIONS } from "@/constants/locations";
import { CATEGORIES } from "@/constants/categories";
import { Image } from "expo-image";
import CameraModal from "@/components/reportItem/CameraModal";

import DateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker"; // date picker package



import colors from "@/constants/colors";

const MAX_PHOTOS = 3;


export default function ReportScreen() {
    const [mode, setMode] = useState("lost");
    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [foundAt, setFoundAt] = useState(new Date()); // starts as current time
    const [showPicker, setShowPicker] = useState(false); // picker starts as unshown
    const [location, setLocation] = useState("");
    const [heldAt, setHeldAt] = useState("finder");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);   // array of photos (URIs) the user has added
    const [cameraOpen, setCameraOpen] = useState(false);  // is the camera showing?



 // search: places whose name OR detail contains what the user typed
    const query = location.toLowerCase();
    const matches = CAMPUS_LOCATIONS.filter((place) =>
        place.name.toLowerCase().includes(query) ||
        place.detail.toLowerCase().includes(query)
    );

    // show the list only while typing, and hide it once a place has been picked
    const showSuggestions = location !== "" && !CAMPUS_LOCATIONS.some((place) => place.name === location);



    function openPicker() {
    // ANDROID: the picker is a pop-up, so we open it with a function.
    // Android can't pick date + time together, so: date pop-up first, then time pop-up.
    if (Platform.OS === "android") {

        // 1st pop-up: calendar
        DateTimePickerAndroid.open({
            value: foundAt,              // start on the currently chosen date
            mode: "date",
            maximumDate: new Date(),     // no future days
            onValueChange: (event, pickedDate) => {

                // 2nd pop-up: clock (opens right after the user picks a day)
                DateTimePickerAndroid.open({
                    value: pickedDate,   // keep the day they just picked
                    mode: "time",
                    onValueChange: (event, pickedDateTime) => setFoundAt(pickedDateTime), // save day + time
                });
            },
        });
    }

    // iOS: the picker is part of the screen 
    // Here we just show it or hide it.
    else if (Platform.OS === "ios") {
        setShowPicker(!showPicker);      // false → true (show), true → false (hide)
    }
}



    return (
        <SafeAreaView className="flex-1 bg-surface">
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pb-10 gap-6"> 
                //keyboard should persistTaps="handled" means that if the user taps on a button while the keyboard is open, the keyboard will close and the button will still be pressed. 
                //Without this, the keyboard would close but the button press would be ignored.(2ndpress)

            {   /* 1. Header: X button + "Report an Item" */
            
            <View className= "flex-row items-center gap-3 pt-2">

                    <Pressable className="size-11 rounded-xl bg-white border border-line items-center justify-center" onPress={() => router.back()}>
                    <X size={20} color={colors.ink} />
                    </Pressable>
                    <Text className="text-2xl font-bold text-ink">Report an item</Text>
            </View>
            
            
            }


            {   /* 2. Toggle: "I lost something" | "I found something" */
            
            <View className="flex-row bg-line rounded-2xl p-1">
                <Pressable className={`flex-1 py-3 rounded-xl items-center ${mode ==="lost" ? "bg-white" : ""}`} onPress={() => setMode("lost")}>
                    <Text className={`font-semibold ${mode ==="lost" ? "text-ink" : "text-ink/50"}`}>I lost something</Text>
                </Pressable>

                <Pressable className={`flex-1 py-3 rounded-xl items-center ${mode ==="found" ? "bg-white" : ""}`} onPress={() => setMode("found")}>
                    <Text className={`font-semibold ${mode ==="found" ? "text-ink" : "text-ink/50"}`}>I found something</Text>
                </Pressable>


            </View>
            
            }

          {/* 3. Photos: thumbnails + "Add photo" box */
            <View className="flex-row gap-3">

                {/* one thumbnail per photo taken */}
                {photos.map((uri) => (
                    <View key={uri} className="size-28">

                        {/* inner box: rounds the photo's corners */}
                        <View className="size-28 rounded-2xl overflow-hidden bg-mint">
                            <Image source={{ uri }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                        </View>

                        {/* ✕ badge: removes this photo */}
                        <Pressable
                            onPress={() => setPhotos(photos.filter((p) => p !== uri))}
                            className="absolute -top-2 -right-2 size-6 rounded-full bg-ink items-center justify-center"
                        >
                            <X size={12} color="white" />
                        </Pressable>
                    </View>
                ))}

                {/* "Add photo": hidden once the limit is reached */}
                {photos.length < MAX_PHOTOS && (
                    <Pressable
                        onPress={() => setCameraOpen(true)}
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
                    {CATEGORIES.map((item) => (
                        <Pressable
                            key={item.id}
                            onPress={() => setCategory(item.id)}
                            className={`w-[31%] py-4 rounded-3xl border items-center gap-2 ${category === item.id ? "bg-mint border-primary" : "bg-white border-line"}`}
                        >
                            <item.icon size={22} color={category === item.id ? colors.primary : colors.ink} />
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
                value={itemName}
                onChangeText={setItemName}
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
                value={description}
                onChangeText={setDescription}
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
                <Text className="font-semibold text-ink"> {mode === "found" ? "When did you find it?" : "When did you lose it?"}</Text>
                <Pressable
                onPress={openPicker}
                className="bg-white border border-line rounded-3xl h-14 px-4 justify-center">
                    <Text className="text-ink">{foundAt.toLocaleDateString([], {day: "numeric", month:"short"})}, {foundAt.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</Text>
                </Pressable>
                {Platform.OS === "ios" && showPicker && (<DateTimePicker themeVariant="light" accentColor={colors.primary} value={foundAt} mode="datetime" display="spinner" maximumDate={new Date()} onValueChange={(event ,pickedDate) => setFoundAt(pickedDate)} />)}
            </View>
            
            }

            {/* 8. Where did you find it? + pin button */
            <View className="gap-3">
                <Text className="font-semibold text-ink">{mode === "found" ? "Where did you find it?" : "Where did you lose it?"}</Text>
                
                <View className="flex-row gap-3">
                    <TextInput 
                    value={location}
                    onChangeText={setLocation}
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

                {showSuggestions && matches.length > 0 && (
                <View className="bg-white border border-line rounded-3xl overflow-hidden">
                    {matches.slice(0,5).map((place) => (
                        <Pressable
                        key={place.id}
                        onPress={() => setLocation(place.name)}
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
            
            {mode === "found" && (
                <View className="gap-3">
                    <Text className="font-semibold text-ink">Where is the item now?</Text>
                    <View className="flex-row gap-3 items-center justify-center">
                        <Pressable
                            onPress={() => setHeldAt("finder")}
                            className={`flex-1 h-20 px-3 rounded-3xl border items-center justify-center ${heldAt === "finder" ? "bg-primary border-primary" : "bg-white border-line"}`}
                        >
                            <Text className={`text-center ${heldAt === "finder" ? "text-white" : "text-ink"}`}>I have it with me</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setHeldAt("security")}
                            className={`flex-1 h-20 px-3 rounded-3xl border items-center justify-center ${heldAt === "security" ? "bg-primary border-primary" : "bg-white border-line"}`}
                        >
                            <Text className={`text-center ${heldAt === "security" ? "text-white" : "text-ink"}`}>I left it at the security desk</Text>
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
                value={securityQuestion}
                onChangeText={setSecurityQuestion}
                placeholder="e.g. What's attached to the keyring"
                placeholderTextColor={colors.muted}
                className="bg-white border border-line rounded-3xl h-14 px-4 text-ink"
                >
                </TextInput>

                <TextInput
                value={securityAnswer}
                onChangeText={setSecurityAnswer}
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
            visible={cameraOpen}
            photoCount={photos.length}
            onCapture={(uri) => setPhotos([...photos, uri])}
            onClose={() => setCameraOpen(false)}
            maxPhotos={MAX_PHOTOS}
            ></CameraModal>
        </SafeAreaView>
    )
}