import { ReactNode } from "react";
import { Text } from "react-native";

export default function FieldLabel({ children }: { children: ReactNode }) {
  return <Text className="font-semibold text-ink">{children}</Text>;
}
