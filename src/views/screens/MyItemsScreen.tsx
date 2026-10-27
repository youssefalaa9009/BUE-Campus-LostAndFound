import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette as C } from "@/constants/palette";
import ActionButton from "@/views/components/ActionButton";
import IconTile from "@/views/components/IconTile";
import ItemProgress from "@/views/components/ItemProgress";
import { useMyItemsViewModel } from "@/viewmodels/useMyItemsViewModel";

export default function MyItemsScreen() {
  const vm = useMyItemsViewModel();

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView style={styles.page} contentContainerStyle={styles.myItemsContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}><Text style={styles.pageTitle}>My items</Text><Pressable style={styles.addButton} onPress={vm.reportItem}><Text style={styles.addPlus}>＋</Text></Pressable></View>
        <View style={styles.segment}>
          {vm.tabs.map((t) => <Pressable key={t.tab} onPress={() => vm.selectTab(t.tab)} style={[styles.segmentOption, t.selected && styles.segmentSelected]}><Text style={[styles.segmentText, t.selected && styles.segmentTextSelected]}>{t.label}</Text></Pressable>)}
        </View>
        {vm.cards.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeading}>
              <IconTile icon={item.icon} />
              <Pressable style={styles.itemTitleWrap} onPress={() => vm.openDetails(item.title)}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemSubtitle}>{item.subtitle}</Text></Pressable>
              <View style={styles.lostBadge}><Text style={styles.lostBadgeText}>{item.badge}</Text></View>
            </View>
            <ItemProgress step={item.step} />
            <View style={styles.itemCallout}>
              <Text style={styles.itemNote}>{item.note}</Text>
              <ActionButton title={item.action.title} compact light={item.action.light} onPress={item.action.onPress} />
            </View>
          </View>
        ))}
        <View style={{ height: 18 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: C.background },
  page: { flex: 1, backgroundColor: C.background },
  myItemsContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },
  listHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  pageTitle: { color: C.text, fontSize: 30, fontWeight: "800", letterSpacing: -0.8 },
  addButton: { width: 56, height: 56, borderRadius: 20, backgroundColor: C.green, alignItems: "center", justifyContent: "center" },
  addPlus: { color: C.white, fontSize: 35, lineHeight: 39, marginTop: -2 },
  segment: { flexDirection: "row", backgroundColor: C.pale, borderRadius: 22, padding: 5, marginBottom: 20 },
  segmentOption: { flex: 1, borderRadius: 17, alignItems: "center", justifyContent: "center", paddingVertical: 15 },
  segmentSelected: { backgroundColor: C.white, elevation: 2, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  segmentText: { color: C.muted, fontWeight: "700", fontSize: 16 },
  segmentTextSelected: { color: C.text },
  itemCard: { backgroundColor: C.white, borderColor: C.border, borderWidth: 1.3, borderRadius: 30, padding: 17, marginBottom: 17 },
  itemHeading: { flexDirection: "row", alignItems: "center", gap: 13, marginBottom: 17 },
  itemTitleWrap: { flex: 1 },
  itemTitle: { color: C.text, fontSize: 17, fontWeight: "800", marginBottom: 5 },
  itemSubtitle: { color: C.muted, fontSize: 14, lineHeight: 20 },
  lostBadge: { backgroundColor: C.amber, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, alignSelf: "flex-start" },
  lostBadgeText: { color: "#3C2C16", fontSize: 14, fontWeight: "800" },
  itemCallout: { backgroundColor: C.pale, borderRadius: 24, padding: 13, flexDirection: "row", alignItems: "center", gap: 10 },
  itemNote: { color: C.text, fontSize: 14, lineHeight: 21, flex: 1 },
});
