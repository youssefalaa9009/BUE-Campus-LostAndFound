import "../../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>

<Stack.Screen name="reportItem" options={{ presentation: "modal", headerShown: false }} />
<Stack.Screen name="campusMap" options={{ headerShown: false }} />
<Stack.Screen name="chat" options={{ headerShown: false }} />
<Stack.Screen name="itemDetails" options={{ headerShown: false }} />
  </Stack>;
}
