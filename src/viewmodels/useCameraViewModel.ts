import { useCameraPermissions } from "expo-camera";

type Options = {
    photoCount: number;
    maxPhotos: number;
};

export function useCameraViewModel({ photoCount, maxPhotos }: Options) {
    const [permission, requestPermission] = useCameraPermissions();

    return {
        hasPermission: permission?.granted ?? false,
        requestPermission,
        photoLabel: `Photo ${photoCount + 1} of ${maxPhotos}`,
    };
}
