import { StyleSheet, Text, View } from "react-native";
import { palette as C } from "@/constants/palette";
import colors from "@/constants/colors";

const labels = ["Alert on", "Match found", "Verified", "Returned"];

export default function ItemProgress({ step }: { step: number }) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressBars}>
        {labels.map((label, index) => <View key={label} style={[styles.progressBar, index < step && styles.progressBarActive]} />)}
      </View>
      <View style={styles.progressLabels}>
        {labels.map((label, index) => <Text key={label} style={[styles.progressLabel, index === step - 1 && styles.progressLabelCurrent]}>{label}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrap: { marginBottom: 19 },
  progressBars: { flexDirection: "row", gap: 5, marginBottom: 9 },
  progressBar: { flex: 1, height: 7, borderRadius: 5, backgroundColor: colors.line },
  progressBarActive: { backgroundColor: C.green },
  progressLabels: { flexDirection: "row", gap: 5 },
  progressLabel: { flex: 1, color: C.muted, fontSize: 12, lineHeight: 17 },
  progressLabelCurrent: { color: C.text, fontWeight: "800" },
});
