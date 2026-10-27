import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette as C } from "@/constants/palette";
import ActionButton from "@/views/components/ActionButton";
import Avatar from "@/views/components/Avatar";
import BackButton from "@/views/components/BackButton";
import { useItemDetailsViewModel } from "@/viewmodels/useItemDetailsViewModel";

export default function ItemDetailsScreen() {
  const vm = useItemDetailsViewModel();

  return (
    <SafeAreaView style={styles.app} edges={["top"]}>
      <ScrollView style={styles.page} contentContainerStyle={styles.detailsContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <BackButton onPress={vm.goBack} />
            <Pressable style={styles.circleButton} onPress={vm.share}><Text style={styles.shareIcon}>↥</Text></Pressable>
          </View>
          <View style={styles.keyArt}><Text style={styles.keyEmoji}>⚿</Text></View>
          <View style={styles.dots}><View style={styles.dotActive} /><View style={styles.dot} /></View>
        </View>
        <View style={styles.detailBody}>
          <View style={styles.statusPill}><Text style={styles.statusPillText}>Found</Text></View>
          <Text style={styles.detailTitle}>{vm.detailTitle}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoCard}><Text style={styles.infoLabel}>Found at</Text><Text style={styles.infoValue}>Food court,{"\n"}counter 3</Text></View>
            <View style={styles.infoCard}><Text style={styles.infoLabel}>Date found</Text><Text style={styles.infoValue}>Today, 10:40</Text></View>
          </View>
          <Text style={styles.description}>Three keys on a ring with a blue rubber tag, left on a table after lunch. Nour is keeping them safe until the owner claims them.</Text>
          <View style={styles.posterCard}>
            <Avatar letter="N" />
            <View style={{ flex: 1 }}><Text style={styles.posterName}>Posted by Nour · Engineering</Text><Text style={styles.posterSub}>Verified BUE account</Text></View>
          </View>
          <View style={styles.spacerLarge} />
        </View>
        <View style={styles.bottomAction}><ActionButton title={vm.claimLabel} onPress={vm.claim} /></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.mint },
  page: { flex: 1, backgroundColor: C.background },
  detailsContent: { paddingBottom: 0 },
  hero: { backgroundColor: C.mint, borderBottomLeftRadius: 48, borderBottomRightRadius: 48, minHeight: 405, paddingHorizontal: 24, paddingTop: 18, paddingBottom: 20 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  circleButton: { width: 56, height: 56, borderRadius: 20, backgroundColor: C.white, alignItems: "center", justifyContent: "center" },
  shareIcon: { color: C.text, fontSize: 29, lineHeight: 34 },
  keyArt: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 270 },
  keyEmoji: { fontSize: 140, color: C.green, transform: [{ rotate: "-42deg" }] },
  dots: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, paddingBottom: 2 },
  dotActive: { width: 28, height: 7, borderRadius: 5, backgroundColor: C.green },
  dot: { width: 8, height: 8, borderRadius: 5, backgroundColor: C.white },
  detailBody: { paddingHorizontal: 24, paddingTop: 24 },
  statusPill: { backgroundColor: C.green, alignSelf: "flex-start", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, marginBottom: 12 },
  statusPillText: { color: C.white, fontSize: 15, fontWeight: "700" },
  detailTitle: { fontSize: 30, lineHeight: 37, letterSpacing: -0.8, fontWeight: "800", color: C.text, marginBottom: 23 },
  infoRow: { flexDirection: "row", gap: 12 },
  infoCard: { flex: 1, minHeight: 108, backgroundColor: C.white, borderWidth: 1.5, borderColor: C.border, borderRadius: 26, padding: 17 },
  infoLabel: { color: C.muted, fontSize: 15, marginBottom: 4 },
  infoValue: { color: C.text, fontWeight: "700", fontSize: 17, lineHeight: 23 },
  description: { color: C.muted, fontSize: 17, lineHeight: 27, marginTop: 26, marginBottom: 26 },
  posterCard: { backgroundColor: C.pale, borderRadius: 27, padding: 16, flexDirection: "row", alignItems: "center", gap: 14 },
  posterName: { color: C.text, fontSize: 16, fontWeight: "700", marginBottom: 3 },
  posterSub: { color: C.muted, fontSize: 15 },
  spacerLarge: { height: 88 },
  bottomAction: { padding: 18, borderTopWidth: 1, borderTopColor: "#E5EBE3", backgroundColor: C.background },
});
