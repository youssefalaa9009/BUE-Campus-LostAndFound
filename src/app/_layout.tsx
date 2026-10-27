import "../../global.css";
import { Stack } from "expo-router";

const tabScreen = { animation: "none", gestureEnabled: false } as const;

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Homescreen" options={tabScreen} />
      <Stack.Screen name="campusMap" options={tabScreen} />
      <Stack.Screen name="myItems" options={tabScreen} />
      <Stack.Screen name="reportItem" options={{ presentation: "modal" }} />
      <Stack.Screen name="itemDetails" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="QRCodeScan" />
    </Stack>
  );
}
