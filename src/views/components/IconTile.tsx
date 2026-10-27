import { StyleSheet, Text, View } from "react-native";
import { palette as C } from "@/constants/palette";

export default function IconTile({ icon }: { icon: string }) {
  return <View style={styles.iconTile}><Text style={styles.tileIcon}>{icon}</Text></View>;
}

const styles = StyleSheet.create({
  iconTile: { width: 70, height: 70, borderRadius: 24, backgroundColor: C.amberPale, alignItems: "center", justifyContent: "center" },
  tileIcon: { color: "#95652B", fontSize: 38 },
});
