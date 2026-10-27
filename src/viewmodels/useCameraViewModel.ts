import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { MAX_PHOTOS } from "@/constants/photos";
import { addDraftPhoto, getDraftPhotos } from "@/services/photoDraftService";

export function useCameraViewModel() {
    const [permission, requestPermission] = useCameraPermissions();
    const photoCount = getDraftPhotos().length;

    return {
        hasPermission: permission?.granted ?? false,
        requestPermission,
        photoLabel: `Photo ${photoCount + 1} of ${MAX_PHOTOS}`,
        capture: (uri: string) => addDraftPhoto(uri),
        close: () => router.back(),
    };
}
