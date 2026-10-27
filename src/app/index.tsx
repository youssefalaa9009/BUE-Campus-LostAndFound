import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-black px-6 pt-12">
      <Link href="/reportItem">
      
        <Text className="px-6 pt-12 text-white mt-4">Open Report</Text>
      
      </Link>

      <Link href="/campusMap">
          <Text className="text-white mt-4">Open Map</Text>
      </Link>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
