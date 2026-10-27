import { Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import colors from "@/constants/colors";

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className="bg-white border border-line items-center justify-center"
      style={{ width: 46, height: 46, borderRadius: 16 }}
    >
      <ChevronLeft size={22} color={colors.ink} />
    </Pressable>
  );
}
