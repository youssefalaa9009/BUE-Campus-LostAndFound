import { Modal, View, Pressable, Text } from "react-native";
import { X, KeyRound, ImageIcon, Zap } from "lucide-react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

// What the Report screen passes in
type Props = {
    visible: boolean;                    // open or closed
    photoCount: number;                  // how many photos already taken
    maxPhotos: number;
    onCapture: (uri: string) => void;    // call with each new photo
    onClose: () => void;                 // call to close the camera
};

export default function CameraModal({ visible, photoCount, maxPhotos, onCapture, onClose }: Props) {
    const [permission, requestPermission] = useCameraPermissions();
    
    
    return (
        <Modal visible={visible} animationType="slide">
            <View className="flex-1 bg-black">
                <View className="flex-1">
                    {permission?.granted ? (
                        <CameraView style={{ flex: 1 }} facing="back"/>
                    ) : ( 
                        <View className="flex-1 items-center justify-center gap-4 px-8">
                            <Text className="text-white text-center">We need your camera to photograph the item</Text>
                            <Pressable className="bg-primary rounded-3xl px-6 h-12 justify-center" onPress={requestPermission}> 
                                <Text className="text-white font-semibold">Allow Camera</Text>
                            </Pressable>
                        </View>


                )}
                {/* top overlay */}
                    <View className="absolute inset-0 pt-16 px-5">

                        {/* top row */}
                        <View className="flex-row items-center justify-between">

                            <Pressable onPress={onClose} className="size-12 rounded-2xl bg-black/70 items-center justify-center">
                                <X size={20} color="white" />
                            </Pressable>

                            <View className="bg-black/70 rounded-full px-4 py-2">
                                <Text className="text-white font-semibold">Photo {photoCount + 1} of {maxPhotos}</Text>
                            </View>

                            <Pressable onPress={() => {}} className="size-12 rounded-2xl bg-black/70 items-center justify-center">
                                <Zap size={20} color="white" />
                            </Pressable>

                        </View>
                        {/* middle + hint */}
                        <View className="flex-1 items-center justify-center gap-6">

                            <View className="w-64 h-72 rounded-3xl border-2 border-dashed border-white/70" />

                            <Text className="text-white/90 text-center text-sm px-6">
                                Keep the item inside the frame. Cover personal details like names or card numbers.
                            </Text>

                        </View>

                    </View>

                </View>

                            {/* Bottom bar */}

                <View className="h-36 bg-neutral-900 flex-row items-center justify-between px-10">
                    <View className="size-14 rounded-xl border-2 border-white/80 items-center justify-center">
                        <KeyRound size={20} color="white" />

                    </View>

                    <Pressable onPress={() => {}} className="size-20 rounded-full border-4 border-white items-center justify-center">
                         <View className="size-16 rounded-full bg-white" />
                    </Pressable>

                    <Pressable onPress={() => {}} className="size-14 rounded-full bg-white/10 items-center justify-center">
                          <ImageIcon size={22} color="white" />
                    </Pressable>
                </View>



            </View>
        </Modal>
    );
}
