import { TextInput, TextInputProps } from "react-native";
import colors from "@/constants/colors";

export default function FormInput({ className = "", multiline, ...props }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      multiline={multiline}
      className={`bg-white border border-line rounded-3xl px-4 text-ink ${multiline ? "h-24 py-3" : "h-14"} ${className}`}
      {...props}
    />
  );
}
