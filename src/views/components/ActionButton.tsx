import { Pressable, StyleSheet, Text } from "react-native";
import { palette as C } from "@/constants/palette";

type Props = {
  title: string;
  onPress: () => void;
  light?: boolean;
  compact?: boolean;
};

export default function ActionButton({ title, onPress, light = false, compact = false }: Props) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, light && styles.buttonLight, compact && styles.buttonCompact, pressed && styles.pressed]}>
      <Text style={[styles.buttonText, light && styles.buttonTextLight, compact && styles.buttonTextCompact]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: C.green, borderRadius: 23, minHeight: 58, paddingHorizontal: 20, paddingVertical: 15, alignItems: "center", justifyContent: "center" },
  buttonLight: { backgroundColor: C.pale },
  buttonCompact: { minHeight: 44, borderRadius: 18, paddingHorizontal: 15, paddingVertical: 10 },
  buttonText: { color: C.white, fontSize: 18, fontWeight: "700" },
  buttonTextLight: { color: C.green },
  buttonTextCompact: { fontSize: 15 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
});
