import { StyleSheet, Text, View } from "react-native";
import { palette as C } from "@/constants/palette";
import colors from "@/constants/colors";

export default function Avatar({ letter }: { letter: string }) {
  return <View style={styles.avatar}><Text style={styles.avatarLetter}>{letter}</Text></View>;
}

const styles = StyleSheet.create({
  avatar: { width: 54, height: 54, borderRadius: 30, backgroundColor: C.amber, alignItems: "center", justifyContent: "center" },
  avatarLetter: { color: colors.onAccent, fontSize: 23, fontWeight: "700" },
});
