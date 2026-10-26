import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Screen = "details" | "chat" | "myItems" | "home" | "map" | "profile";
type ItemStatus = "Lost" | "Found";

const C = {
  green: "#376951",
  greenDark: "#2E5D47",
  mint: "#DCEBE2",
  pale: "#E8EEE4",
  background: "#F3F6F0",
  white: "#FFFFFF",
  text: "#18221D",
  muted: "#6E7972",
  border: "#DDE6DC",
  amber: "#E7A64B",
  amberPale: "#F8EBD5",
};

type Item = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  status: ItemStatus;
  step: number;
  note: string;
};

const initialItems: Item[] = [
  { id: 1, title: "White earphones case", subtitle: "Alert on · lost in lecture hall B today", icon: "♫", status: "Lost", step: 2, note: "2 possible matches to review" },
  { id: 2, title: "Car keys, blue tag", subtitle: "Found by Nour · food court", icon: "⚿", status: "Lost", step: 3, note: "Ownership confirmed. Pick up before 4 PM." },
  { id: 3, title: "Green water bottle", subtitle: "Lost in the sports hall · 2 weeks ago", icon: "♧", status: "Lost", step: 4, note: "Item returned successfully." },
  { id: 4, title: "Black notebook", subtitle: "Found near the library · yesterday", icon: "▤", status: "Found", step: 2, note: "Waiting for the owner to respond." },
  { id: 5, title: "Student ID card", subtitle: "Found at the main entrance · today", icon: "▣", status: "Found", step: 1, note: "A possible owner match was found." },
];

function ActionButton({ title, onPress, light = false, compact = false }: { title: string; onPress: () => void; light?: boolean; compact?: boolean }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, light && styles.buttonLight, compact && styles.buttonCompact, pressed && styles.pressed]}>
      <Text style={[styles.buttonText, light && styles.buttonTextLight, compact && styles.buttonTextCompact]}>{title}</Text>
    </Pressable>
  );
}

function IconTile({ icon }: { icon: string }) {
  return <View style={styles.iconTile}><Text style={styles.tileIcon}>{icon}</Text></View>;
}

function Header({ title, onBack, right }: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <View style={styles.header}>
      {onBack ? <Pressable onPress={onBack} style={styles.backButton} accessibilityLabel="Go back"><Text style={styles.backText}>‹</Text></Pressable> : null}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>{right}</View>
    </View>
  );
}

function Progress({ step }: { step: number }) {
  const labels = ["Alert on", "Match found", "Verified", "Returned"];
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

function BottomNav({ active, onChange, onReport }: { active: string; onChange: (s: Screen) => void; onReport: () => void }) {
  const tabs: { label: string; icon: string; screen: Screen }[] = [
    { label: "Home", icon: "⌂", screen: "home" },
    { label: "Map", icon: "⌖", screen: "map" },
    { label: "My items", icon: "▢", screen: "myItems" },
    { label: "Profile", icon: "♙", screen: "profile" },
  ];
  return (
    <View style={styles.bottomNav}>
      {tabs.slice(0, 2).map(tab => (
        <Pressable key={tab.label} style={styles.navTab} onPress={() => onChange(tab.screen)}>
          <Text style={[styles.navIcon, active === tab.screen && styles.navActive]}>{tab.icon}</Text>
          <Text style={[styles.navLabel, active === tab.screen && styles.navActive]}>{tab.label}</Text>
        </Pressable>
      ))}
      <Pressable onPress={onReport} style={styles.reportNav}>
        <Text style={styles.reportPlus}>＋</Text>
        <Text style={styles.navLabel}>Report</Text>
      </Pressable>
      {tabs.slice(2).map(tab => (
        <Pressable key={tab.label} style={styles.navTab} onPress={() => onChange(tab.screen)}>
          <Text style={[styles.navIcon, active === tab.screen && styles.navActive]}>{tab.icon}</Text>
          <Text style={[styles.navLabel, active === tab.screen && styles.navActive]}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function Index() {
  const [screen, setScreen] = useState<Screen>("myItems");
  const [items, setItems] = useState<Item[]>(initialItems);
  const [itemTab, setItemTab] = useState<ItemStatus>("Lost");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! Glad they’re yours. I’m at the food court until 4.", mine: false, time: "11:03" },
    { id: 2, text: "Thank you so much! I have a lecture until 3:15. Could we meet right after?", mine: true, time: "11:05" },
    { id: 3, text: "Sure, at the table where I found them.", mine: false, time: "11:06" },
  ]);
  const [draft, setDraft] = useState("");
  const [pickupCodeVisible, setPickupCodeVisible] = useState(false);
  const [returned, setReturned] = useState(false);
  const [detailTitle, setDetailTitle] = useState("Car keys, blue tag");

  const filteredItems = useMemo(() => items.filter(item => item.status === itemTab), [items, itemTab]);

  const openDetails = (title = "Car keys, blue tag") => {
    setDetailTitle(title);
    setScreen("details");
  };
  const reportItem = () => Alert.alert("Report an item", "Choose what you want to report.", [
    { text: "I lost something", onPress: () => Alert.alert("New lost item", "Your report form is ready to connect. Add a title, location, and photo in the full report flow.") },
    { text: "I found something", onPress: () => Alert.alert("New found item", "Your found-item report flow is ready. Keep the item safe and meet in a public campus location.") },
    { text: "Cancel", style: "cancel" },
  ]);
  const sendMessage = (text = draft) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { id: Date.now(), text: clean, mine: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) }]);
    setDraft("");
  };

  const renderDetails = () => (
    <ScrollView style={styles.page} contentContainerStyle={styles.detailsContent} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Pressable style={styles.circleButton} onPress={() => setScreen("myItems")}><Text style={styles.circleButtonText}>‹</Text></Pressable>
          <Pressable style={styles.circleButton} onPress={() => Alert.alert("Share item", "Share this listing with someone who may know the owner.")}><Text style={styles.shareIcon}>↥</Text></Pressable>
        </View>
        <View style={styles.keyArt}><Text style={styles.keyEmoji}>⚿</Text></View>
        <View style={styles.dots}><View style={styles.dotActive} /><View style={styles.dot} /></View>
      </View>
      <View style={styles.detailBody}>
        <View style={styles.statusPill}><Text style={styles.statusPillText}>Found</Text></View>
        <Text style={styles.detailTitle}>{detailTitle}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoCard}><Text style={styles.infoLabel}>Found at</Text><Text style={styles.infoValue}>Food court,{"\n"}counter 3</Text></View>
          <View style={styles.infoCard}><Text style={styles.infoLabel}>Date found</Text><Text style={styles.infoValue}>Today, 10:40</Text></View>
        </View>
        <Text style={styles.description}>Three keys on a ring with a blue rubber tag, left on a table after lunch. Nour is keeping them safe until the owner claims them.</Text>
        <View style={styles.posterCard}>
          <View style={styles.avatar}><Text style={styles.avatarLetter}>N</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.posterName}>Posted by Nour · Engineering</Text><Text style={styles.posterSub}>Verified BUE account</Text></View>
        </View>
        <View style={styles.spacerLarge} />
      </View>
      <View style={styles.bottomAction}><ActionButton title={returned ? "Item returned ✓" : "Claim this item"} onPress={() => { if (returned) { Alert.alert("Already returned", "This item has been marked as returned."); } else { setScreen("chat"); } }} /></View>
    </ScrollView>
  );

  const renderChat = () => (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={12}>
      <View style={styles.chatHeader}>
        <Pressable style={styles.chatBack} onPress={() => setScreen("details")}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.avatar}><Text style={styles.avatarLetter}>N</Text></View>
        <View style={styles.chatPerson}><Text style={styles.chatName}>Nour</Text><Text style={styles.chatPresence}>Found your keys · Online</Text></View>
        <ActionButton title="Pickup code" compact onPress={() => setPickupCodeVisible(true)} />
      </View>
      <View style={styles.chatItemStrip}>
        <Text style={styles.stripKey}>⚿</Text><Text style={styles.stripTitle}>Car keys, blue tag</Text><View style={styles.verifiedPill}><Text style={styles.verifiedText}>Owner verified</Text></View>
      </View>
      <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatMessages} showsVerticalScrollIndicator={false}>
        <View style={styles.systemMessage}><Text style={styles.systemText}>You’re verified as the owner. Use this chat to arrange a pickup. · 11:02</Text></View>
        {messages.map(message => (
          <View key={message.id} style={[styles.messageGroup, message.mine && styles.messageGroupMine]}>
            <View style={[styles.messageBubble, message.mine ? styles.myBubble : styles.theirBubble]}><Text style={[styles.messageText, message.mine && styles.myMessageText]}>{message.text}</Text></View>
            <Text style={[styles.messageTime, message.mine && styles.timeMine]}>{message.time}</Text>
          </View>
        ))}
        <Pressable style={styles.locationCard} onPress={() => Alert.alert("Pickup location", "Food court, counter 3 · Today, 3:30 PM", [
          { text: "Open map", onPress: () => { setScreen("map"); } },
          { text: "OK" },
        ])}>
          <View style={styles.mapPreview}><View style={styles.mapRoadHorizontal} /><View style={styles.mapRoadVertical} /><Text style={styles.mapPin}>●</Text></View>
          <View style={styles.locationInfo}><Text style={styles.locationTitle}>Food court, counter 3</Text><Text style={styles.locationTime}>Today, 3:30 PM</Text><Text style={styles.mapLink}>Open campus map ↗</Text></View>
        </Pressable>
        <Text style={styles.messageTime}>11:06</Text>
      </ScrollView>
      <View style={styles.quickReplies}>
        {["On my way", "Running 5 min late", "Can we meet at 3:30?"].map(reply => <Pressable key={reply} style={styles.quickChip} onPress={() => sendMessage(reply)}><Text style={styles.quickText}>{reply}</Text></Pressable>)}
      </View>
      <View style={styles.composer}>
        <Pressable style={styles.locationButton} onPress={() => Alert.alert("Share location", "Pickup location: Food court, counter 3.")}><Text style={styles.locationButtonText}>⌖</Text></Pressable>
        <TextInput value={draft} onChangeText={setDraft} placeholder="Message Nour" placeholderTextColor={C.muted} style={styles.messageInput} returnKeyType="send" onSubmitEditing={() => sendMessage()} />
        <Pressable style={styles.sendButton} onPress={() => sendMessage()} accessibilityLabel="Send message"><Text style={styles.sendIcon}>➤</Text></Pressable>
      </View>
      <Text style={styles.safetyNote}>For your safety, meet in a public place on campus.</Text>
      {pickupCodeVisible ? <View style={styles.modalShade}><View style={styles.modalCard}><Text style={styles.modalTitle}>Your pickup code</Text><Text style={styles.modalDescription}>Show this code to Nour when you collect the keys.</Text><Text style={styles.pickupCode}>BUE · 482 196</Text><ActionButton title="Done" onPress={() => setPickupCodeVisible(false)} /><Pressable onPress={() => { setPickupCodeVisible(false); setReturned(true); setItems(prev => prev.map(item => item.title === "Car keys, blue tag" ? { ...item, step: 4, note: "Item returned successfully." } : item)); Alert.alert("Marked as returned", "Your item status has been updated."); }} style={styles.markReturned}><Text style={styles.markReturnedText}>Mark item as returned</Text></Pressable></View></View> : null}
    </KeyboardAvoidingView>
  );

  const renderMyItems = () => (
    <View style={styles.flex}>
      <ScrollView style={styles.page} contentContainerStyle={styles.myItemsContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}><Text style={styles.pageTitle}>My items</Text><Pressable style={styles.addButton} onPress={reportItem}><Text style={styles.addPlus}>＋</Text></Pressable></View>
        <View style={styles.segment}>
          {(["Lost", "Found"] as ItemStatus[]).map(tab => <Pressable key={tab} onPress={() => setItemTab(tab)} style={[styles.segmentOption, itemTab === tab && styles.segmentSelected]}><Text style={[styles.segmentText, itemTab === tab && styles.segmentTextSelected]}>{tab} ({items.filter(item => item.status === tab).length})</Text></Pressable>)}
        </View>
        {filteredItems.map(item => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeading}>
              <IconTile icon={item.icon} />
              <Pressable style={styles.itemTitleWrap} onPress={() => openDetails(item.title)}><Text style={styles.itemTitle}>{item.title}</Text><Text style={styles.itemSubtitle}>{item.subtitle}</Text></Pressable>
              <View style={styles.lostBadge}><Text style={styles.lostBadgeText}>{item.step === 4 ? "Returned" : item.status}</Text></View>
            </View>
            <Progress step={item.step} />
            <View style={styles.itemCallout}>
              <Text style={styles.itemNote}>{item.note}</Text>
              {item.id === 1 ? <ActionButton title="Review" compact onPress={() => Alert.alert("Possible matches", "Two possible matches found. Open a match to compare item details.", [{ text: "View car keys", onPress: () => openDetails("Car keys, blue tag") }, { text: "Close", style: "cancel" }])} /> :
                item.id === 2 && item.step < 4 ? <ActionButton title="Pickup code" compact onPress={() => { setScreen("chat"); setPickupCodeVisible(true); }} /> :
                item.step === 4 ? <ActionButton title="View details" compact light onPress={() => openDetails(item.title)} /> :
                <ActionButton title="View" compact onPress={() => openDetails(item.title)} />}
            </View>
          </View>
        ))}
        <View style={{ height: 18 }} />
      </ScrollView>
      <BottomNav active="myItems" onChange={setScreen} onReport={reportItem} />
    </View>
  );

  const renderSimple = (title: string, icon: string, description: string, action: string, onAction: () => void) => (
    <View style={styles.simplePage}>
      <Text style={styles.pageTitle}>{title}</Text>
      <View style={styles.simpleIcon}><Text style={styles.simpleIconText}>{icon}</Text></View>
      <Text style={styles.simpleHeading}>{title === "Home" ? "Campus lost & found" : title === "Map" ? "Find a safe pickup point" : "Your campus profile"}</Text>
      <Text style={styles.simpleDescription}>{description}</Text>
      <ActionButton title={action} onPress={onAction} />
      {title === "Home" ? <View style={styles.homeFeature}><Text style={styles.homeFeatureTitle}>Recently found</Text><Text style={styles.homeFeatureText}>Car keys, blue tag · Food court</Text><ActionButton title="View item" light onPress={() => openDetails()} /></View> : null}
      {title === "Map" ? <View style={styles.mapLarge}><View style={styles.mapRoadHorizontal} /><View style={styles.mapRoadVertical} /><Text style={styles.mapLargePin}>●</Text><Text style={styles.mapLargeLabel}>Food court, counter 3</Text></View> : null}
      <View style={{ flex: 1 }} />
      <BottomNav active={screen} onChange={setScreen} onReport={reportItem} />
    </View>
  );

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />
      {screen === "details" ? renderDetails() :
        screen === "chat" ? renderChat() :
        screen === "myItems" ? renderMyItems() :
        screen === "home" ? renderSimple("Home", "⌂", "Report a lost item, browse found items, and get it back safely.", "Browse my items", () => setScreen("myItems")) :
        screen === "map" ? renderSimple("Map", "⌖", "Arrange a handover at a public, easy-to-find campus location.", "View found keys", () => openDetails()) :
        renderSimple("Profile", "♙", "Your BUE account is verified. Keep your contact details up to date to make returns easier.", "My items", () => setScreen("myItems"))}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.background },
  flex: { flex: 1, backgroundColor: C.background },
  page: { flex: 1, backgroundColor: C.background },
  detailsContent: { paddingBottom: 0 },
  hero: { backgroundColor: C.mint, borderBottomLeftRadius: 48, borderBottomRightRadius: 48, minHeight: 405, paddingHorizontal: 24, paddingTop: 18, paddingBottom: 20 },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  circleButton: { width: 56, height: 56, borderRadius: 20, backgroundColor: C.white, alignItems: "center", justifyContent: "center" },
  circleButtonText: { color: C.text, fontSize: 39, lineHeight: 42, marginTop: -5 },
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
  avatar: { width: 54, height: 54, borderRadius: 30, backgroundColor: C.amber, alignItems: "center", justifyContent: "center" },
  avatarLetter: { color: "#342712", fontSize: 23, fontWeight: "700" },
  posterName: { color: C.text, fontSize: 16, fontWeight: "700", marginBottom: 3 },
  posterSub: { color: C.muted, fontSize: 15 },
  spacerLarge: { height: 88 },
  bottomAction: { padding: 18, borderTopWidth: 1, borderTopColor: "#E5EBE3", backgroundColor: C.background },
  button: { backgroundColor: C.green, borderRadius: 23, minHeight: 58, paddingHorizontal: 20, paddingVertical: 15, alignItems: "center", justifyContent: "center" },
  buttonLight: { backgroundColor: C.pale },
  buttonCompact: { minHeight: 44, borderRadius: 18, paddingHorizontal: 15, paddingVertical: 10 },
  buttonText: { color: C.white, fontSize: 18, fontWeight: "700" },
  buttonTextLight: { color: C.green },
  buttonTextCompact: { fontSize: 15 },
  pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  backButton: { width: 38, height: 42, justifyContent: "center" },
  backText: { fontSize: 40, color: C.text, lineHeight: 42 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: C.text, flex: 1 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  chatHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingTop: 10, paddingBottom: 13, gap: 10 },
  chatBack: { width: 30, alignItems: "center", justifyContent: "center" },
  chatPerson: { flex: 1 },
  chatName: { fontSize: 20, fontWeight: "800", color: C.text },
  chatPresence: { color: C.muted, fontSize: 14, lineHeight: 19 },
  chatItemStrip: { marginHorizontal: 15, backgroundColor: C.pale, borderRadius: 22, padding: 13, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  stripKey: { color: C.green, fontSize: 25 },
  stripTitle: { color: C.text, fontSize: 15, fontWeight: "700", flex: 1 },
  verifiedPill: { backgroundColor: C.mint, borderRadius: 13, paddingHorizontal: 10, paddingVertical: 8 },
  verifiedText: { color: C.green, fontSize: 13, fontWeight: "700" },
  chatScroll: { flex: 1, borderTopWidth: 1, borderTopColor: "#E6ECE4" },
  chatMessages: { paddingHorizontal: 16, paddingTop: 15, paddingBottom: 12 },
  systemMessage: { backgroundColor: C.pale, borderRadius: 20, padding: 12, marginBottom: 15 },
  systemText: { color: C.muted, fontSize: 14, textAlign: "center", lineHeight: 21 },
  messageGroup: { alignSelf: "flex-start", maxWidth: "87%", marginBottom: 13 },
  messageGroupMine: { alignSelf: "flex-end" },
  messageBubble: { paddingHorizontal: 16, paddingVertical: 14, borderRadius: 25 },
  theirBubble: { backgroundColor: C.white, borderBottomLeftRadius: 10 },
  myBubble: { backgroundColor: C.green, borderBottomRightRadius: 10 },
  messageText: { color: C.text, fontSize: 16, lineHeight: 24 },
  myMessageText: { color: C.white },
  messageTime: { color: C.muted, fontSize: 12, marginTop: 5 },
  timeMine: { textAlign: "right" },
  locationCard: { width: "78%", overflow: "hidden", borderRadius: 25, backgroundColor: C.white, borderWidth: 1, borderColor: C.border, marginTop: 4, marginBottom: 5 },
  mapPreview: { height: 112, backgroundColor: "#E7EDE3", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  mapRoadHorizontal: { position: "absolute", height: 13, left: 0, right: 0, top: "47%", backgroundColor: "#D9E1D6" },
  mapRoadVertical: { position: "absolute", width: 12, top: 0, bottom: 0, left: "55%", backgroundColor: "#D9E1D6" },
  mapPin: { fontSize: 33, color: C.green, textShadowColor: C.white, textShadowRadius: 4 },
  locationInfo: { paddingHorizontal: 15, paddingVertical: 12 },
  locationTitle: { color: C.text, fontWeight: "700", fontSize: 16, marginBottom: 4 },
  locationTime: { color: C.muted, fontSize: 15, marginBottom: 8 },
  mapLink: { color: C.green, fontWeight: "700", fontSize: 14, textDecorationLine: "underline" },
  quickReplies: { flexDirection: "row", gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#E3EAE1" },
  quickChip: { borderRadius: 24, backgroundColor: C.background, borderWidth: 1.5, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 12 },
  quickText: { color: C.text, fontSize: 14 },
  composer: { flexDirection: "row", alignItems: "center", gap: 9, paddingHorizontal: 14, paddingVertical: 10 },
  locationButton: { width: 54, height: 54, borderRadius: 20, backgroundColor: C.pale, alignItems: "center", justifyContent: "center" },
  locationButtonText: { fontSize: 29, color: C.text },
  messageInput: { flex: 1, minHeight: 54, borderWidth: 1.5, borderColor: C.border, borderRadius: 20, backgroundColor: C.background, paddingHorizontal: 16, fontSize: 16, color: C.text },
  sendButton: { width: 58, height: 58, borderRadius: 20, backgroundColor: C.green, alignItems: "center", justifyContent: "center" },
  sendIcon: { color: C.white, fontSize: 23 },
  safetyNote: { textAlign: "center", color: C.muted, fontSize: 13, paddingBottom: 9, paddingHorizontal: 8 },
  modalShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(12,20,15,0.45)", alignItems: "center", justifyContent: "center", padding: 24 },
  modalCard: { backgroundColor: C.white, borderRadius: 28, padding: 25, width: "100%", maxWidth: 390, alignItems: "stretch" },
  modalTitle: { color: C.text, fontSize: 24, fontWeight: "800", marginBottom: 9, textAlign: "center" },
  modalDescription: { color: C.muted, fontSize: 15, lineHeight: 22, textAlign: "center", marginBottom: 20 },
  pickupCode: { color: C.green, fontSize: 27, fontWeight: "800", letterSpacing: 1.2, textAlign: "center", paddingVertical: 19, backgroundColor: C.pale, borderRadius: 18, marginBottom: 20 },
  markReturned: { padding: 13, alignItems: "center" },
  markReturnedText: { color: C.green, fontWeight: "700" },
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
  iconTile: { width: 70, height: 70, borderRadius: 24, backgroundColor: C.amberPale, alignItems: "center", justifyContent: "center" },
  tileIcon: { color: "#95652B", fontSize: 38 },
  itemTitleWrap: { flex: 1 },
  itemTitle: { color: C.text, fontSize: 17, fontWeight: "800", marginBottom: 5 },
  itemSubtitle: { color: C.muted, fontSize: 14, lineHeight: 20 },
  lostBadge: { backgroundColor: C.amber, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, alignSelf: "flex-start" },
  lostBadgeText: { color: "#3C2C16", fontSize: 14, fontWeight: "800" },
  progressWrap: { marginBottom: 19 },
  progressBars: { flexDirection: "row", gap: 5, marginBottom: 9 },
  progressBar: { flex: 1, height: 7, borderRadius: 5, backgroundColor: "#DCE4DA" },
  progressBarActive: { backgroundColor: C.green },
  progressLabels: { flexDirection: "row", gap: 5 },
  progressLabel: { flex: 1, color: C.muted, fontSize: 12, lineHeight: 17 },
  progressLabelCurrent: { color: C.text, fontWeight: "800" },
  itemCallout: { backgroundColor: C.pale, borderRadius: 24, padding: 13, flexDirection: "row", alignItems: "center", gap: 10 },
  itemNote: { color: C.text, fontSize: 14, lineHeight: 21, flex: 1 },
  bottomNav: { minHeight: 78, paddingTop: 7, paddingBottom: Platform.OS === "ios" ? 19 : 8, backgroundColor: C.white, borderTopWidth: 1, borderTopColor: "#E2E9E0", flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  navTab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 2 },
  navIcon: { fontSize: 26, color: C.muted, height: 30 },
  navLabel: { fontSize: 12, color: C.muted },
  navActive: { color: C.green, fontWeight: "800" },
  reportNav: { width: 74, alignItems: "center", justifyContent: "center", marginTop: -24 },
  reportPlus: { backgroundColor: C.green, color: C.white, width: 64, height: 64, borderRadius: 23, textAlign: "center", textAlignVertical: "center", fontSize: 38, overflow: "hidden", elevation: 4 },
  simplePage: { flex: 1, backgroundColor: C.background, paddingHorizontal: 20, paddingTop: 25 },
  simpleIcon: { alignSelf: "center", marginTop: 70, width: 125, height: 125, borderRadius: 45, backgroundColor: C.mint, alignItems: "center", justifyContent: "center" },
  simpleIconText: { color: C.green, fontSize: 70 },
  simpleHeading: { color: C.text, fontSize: 24, fontWeight: "800", textAlign: "center", marginTop: 28 },
  simpleDescription: { color: C.muted, fontSize: 16, lineHeight: 25, textAlign: "center", marginTop: 12, marginBottom: 25, paddingHorizontal: 10 },
  homeFeature: { backgroundColor: C.white, borderRadius: 25, padding: 18, marginTop: 25, borderWidth: 1, borderColor: C.border, gap: 10 },
  homeFeatureTitle: { color: C.text, fontSize: 18, fontWeight: "800" },
  homeFeatureText: { color: C.muted, fontSize: 15 },
  mapLarge: { height: 240, marginTop: 28, borderRadius: 28, overflow: "hidden", backgroundColor: "#E7EDE3", alignItems: "center", justifyContent: "center" },
  mapLargePin: { fontSize: 38, color: C.green, marginBottom: 12 },
  mapLargeLabel: { backgroundColor: C.white, color: C.text, fontWeight: "700", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 13 },
});
