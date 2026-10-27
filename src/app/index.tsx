import { Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-black px-6 pt-12">
      <Link href="/reportItem">
        <Text className="text-white mt-4">Open Report</Text>
      </Link>

      <Link href="/campusMap">
        <Text className="text-white mt-4">Open Map</Text>
      </Link>

      <Link href="/Homescreen">
        <Text className="text-white mt-4">Open Home</Text>
      </Link>

      <Link href="/notifications">
        <Text className="text-white mt-4">Open Notifications</Text>
      </Link>

      <Link href="/QRCodeScan">
        <Text className="text-white mt-4">Open QR Code</Text>
      </Link>

      <Link href="/chat">
        <Text className="text-white mt-4">Open Chat</Text>
      </Link>
    </SafeAreaView>
  );
}
