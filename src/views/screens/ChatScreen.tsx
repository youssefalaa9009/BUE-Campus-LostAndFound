import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette as C } from "@/constants/palette";
import ActionButton from "@/views/components/ActionButton";
import { useChatViewModel } from "@/viewmodels/useChatViewModel";

export default function ChatScreen() {
  const vm = useChatViewModel();

  return (
    <SafeAreaView style={styles.app}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={12}>
        <View style={styles.chatHeader}>
          <Pressable style={styles.chatBack} onPress={vm.goBack}><Text style={styles.backText}>‹</Text></Pressable>
          <View style={styles.avatar}><Text style={styles.avatarLetter}>N</Text></View>
          <View style={styles.chatPerson}><Text style={styles.chatName}>Nour</Text><Text style={styles.chatPresence}>Found your keys · Online</Text></View>
          <ActionButton title="Pickup code" compact onPress={vm.openPickup} />
        </View>
        <View style={styles.chatItemStrip}>
          <Text style={styles.stripKey}>⚿</Text><Text style={styles.stripTitle}>{vm.itemTitle}</Text><View style={styles.verifiedPill}><Text style={styles.verifiedText}>Owner verified</Text></View>
        </View>
        <ScrollView style={styles.chatScroll} contentContainerStyle={styles.chatMessages} showsVerticalScrollIndicator={false}>
          <View style={styles.systemMessage}><Text style={styles.systemText}>You’re verified as the owner. Use this chat to arrange a pickup. · 11:02</Text></View>
          {vm.messages.map((message) => (
            <View key={message.id} style={[styles.messageGroup, message.mine && styles.messageGroupMine]}>
              <View style={[styles.messageBubble, message.mine ? styles.myBubble : styles.theirBubble]}><Text style={[styles.messageText, message.mine && styles.myMessageText]}>{message.text}</Text></View>
              <Text style={[styles.messageTime, message.mine && styles.timeMine]}>{message.time}</Text>
            </View>
          ))}
          <Pressable style={styles.locationCard} onPress={vm.showPickupLocation}>
            <View style={styles.mapPreview}><View style={styles.mapRoadHorizontal} /><View style={styles.mapRoadVertical} /><Text style={styles.mapPin}>●</Text></View>
            <View style={styles.locationInfo}><Text style={styles.locationTitle}>Food court, counter 3</Text><Text style={styles.locationTime}>Today, 3:30 PM</Text><Text style={styles.mapLink}>Open campus map ↗</Text></View>
          </Pressable>
          <Text style={styles.messageTime}>11:06</Text>
        </ScrollView>
        <View style={styles.quickReplies}>
          {vm.quickReplies.map((reply) => <Pressable key={reply} style={styles.quickChip} onPress={() => vm.sendMessage(reply)}><Text style={styles.quickText}>{reply}</Text></Pressable>)}
        </View>
        <View style={styles.composer}>
          <Pressable style={styles.locationButton} onPress={vm.shareLocation}><Text style={styles.locationButtonText}>⌖</Text></Pressable>
          <TextInput value={vm.draft} onChangeText={vm.setDraft} placeholder="Message Nour" placeholderTextColor={C.muted} style={styles.messageInput} returnKeyType="send" onSubmitEditing={() => vm.sendMessage()} />
          <Pressable style={styles.sendButton} onPress={() => vm.sendMessage()} accessibilityLabel="Send message"><Text style={styles.sendIcon}>➤</Text></Pressable>
        </View>
        <Text style={styles.safetyNote}>For your safety, meet in a public place on campus.</Text>
        {vm.pickupCodeVisible ? <View style={styles.modalShade}><View style={styles.modalCard}><Text style={styles.modalTitle}>Your pickup code</Text><Text style={styles.modalDescription}>Show this code to Nour when you collect the keys.</Text><Text style={styles.pickupCode}>BUE · 482 196</Text><ActionButton title="Done" onPress={vm.closePickupCode} /><Pressable onPress={vm.confirmReturned} style={styles.markReturned}><Text style={styles.markReturnedText}>Mark item as returned</Text></Pressable></View></View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: C.background },
  flex: { flex: 1, backgroundColor: C.background },
  backText: { fontSize: 40, color: C.text, lineHeight: 42 },
  avatar: { width: 54, height: 54, borderRadius: 30, backgroundColor: C.amber, alignItems: "center", justifyContent: "center" },
  avatarLetter: { color: "#342712", fontSize: 23, fontWeight: "700" },
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
  modalShade: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(12,20,15,0.45)", alignItems: "center", justifyContent: "center", padding: 24 },
  modalCard: { backgroundColor: C.white, borderRadius: 28, padding: 25, width: "100%", maxWidth: 390, alignItems: "stretch" },
  modalTitle: { color: C.text, fontSize: 24, fontWeight: "800", marginBottom: 9, textAlign: "center" },
  modalDescription: { color: C.muted, fontSize: 15, lineHeight: 22, textAlign: "center", marginBottom: 20 },
  pickupCode: { color: C.green, fontSize: 27, fontWeight: "800", letterSpacing: 1.2, textAlign: "center", paddingVertical: 19, backgroundColor: C.pale, borderRadius: 18, marginBottom: 20 },
  markReturned: { padding: 13, alignItems: "center" },
  markReturnedText: { color: C.green, fontWeight: "700" },
});
