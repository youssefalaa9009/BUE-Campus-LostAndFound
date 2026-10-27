import { useState } from "react";
import { Platform } from "react-native";
import { router } from "expo-router";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { CAMPUS_LOCATIONS } from "@/constants/locations";
import { CATEGORIES } from "@/constants/categories";
import { ItemMode, HeldAt } from "@/models/item";

const MAX_PHOTOS = 3;

export function useReportItemViewModel() {
    const [mode, setMode] = useState<ItemMode>("lost");
    const [category, setCategory] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [foundAt, setFoundAt] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [location, setLocation] = useState("");
    const [heldAt, setHeldAt] = useState<HeldAt>("finder");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [photos, setPhotos] = useState<string[]>([]);
    const [cameraOpen, setCameraOpen] = useState(false);

    const query = location.toLowerCase();
    const matches = CAMPUS_LOCATIONS.filter((place) =>
        place.name.toLowerCase().includes(query) ||
        place.detail.toLowerCase().includes(query)
    );
    const showSuggestions = location !== "" && !CAMPUS_LOCATIONS.some((place) => place.name === location);

    function openPicker() {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: foundAt,
                mode: "date",
                maximumDate: new Date(),
                onValueChange: (event, pickedDate) => {
                    DateTimePickerAndroid.open({
                        value: pickedDate,
                        mode: "time",
                        onValueChange: (event, pickedDateTime) => setFoundAt(pickedDateTime),
                    });
                },
            });
        }
        else if (Platform.OS === "ios") {
            setShowPicker(!showPicker);
        }
    }

    const dateLabel = `${foundAt.toLocaleDateString([], { day: "numeric", month: "short" })}, ${foundAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    return {
        categories: CATEGORIES,
        maxPhotos: MAX_PHOTOS,

        mode, setMode,
        category, setCategory,
        itemName, setItemName,
        description, setDescription,

        foundAt, setFoundAt, dateLabel,
        showPicker, openPicker,

        location, setLocation,
        matches, showSuggestions,

        heldAt, setHeldAt,
        securityQuestion, setSecurityQuestion,
        securityAnswer, setSecurityAnswer,

        photos,
        canAddPhoto: photos.length < MAX_PHOTOS,
        addPhoto: (uri: string) => setPhotos([...photos, uri]),
        removePhoto: (uri: string) => setPhotos(photos.filter((p) => p !== uri)),

        cameraOpen,
        openCamera: () => setCameraOpen(true),
        closeCamera: () => setCameraOpen(false),

        close: () => router.back(),
    };
}
