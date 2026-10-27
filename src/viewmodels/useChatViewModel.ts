import { useState } from "react";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { markReturned } from "@/services/myItemsService";

type Message = {
  id: number;
  text: string;
  mine: boolean;
  time: string;
};

const ITEM_TITLE = "Car keys, blue tag";
const QUICK_REPLIES = ["On my way", "Running 5 min late", "Can we meet at 3:30?"];

export function useChatViewModel() {
  const { showCode } = useLocalSearchParams<{ showCode?: string }>();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! Glad they’re yours. I’m at the food court until 4.", mine: false, time: "11:03" },
    { id: 2, text: "Thank you so much! I have a lecture until 3:15. Could we meet right after?", mine: true, time: "11:05" },
    { id: 3, text: "Sure, at the table where I found them.", mine: false, time: "11:06" },
  ]);
  const [draft, setDraft] = useState("");
  const [pickupCodeVisible, setPickupCodeVisible] = useState(showCode === "1");

  function sendMessage(text = draft) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { id: Date.now(), text: clean, mine: true, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) }]);
    setDraft("");
  }

  function confirmReturned() {
    setPickupCodeVisible(false);
    markReturned(ITEM_TITLE);
    Alert.alert("Marked as returned", "Your item status has been updated.");
  }

  function showPickupLocation() {
    Alert.alert("Pickup location", "Food court, counter 3 · Today, 3:30 PM", [
      { text: "Open map", onPress: () => router.push("/campusMap") },
      { text: "OK" },
    ]);
  }

  function shareLocation() {
    Alert.alert("Share location", "Pickup location: Food court, counter 3.");
  }

  return {
    itemTitle: ITEM_TITLE,
    quickReplies: QUICK_REPLIES,
    messages,
    draft,
    setDraft,
    sendMessage,
    pickupCodeVisible,
    openPickupCode: () => setPickupCodeVisible(true),
    closePickupCode: () => setPickupCodeVisible(false),
    confirmReturned,
    showPickupLocation,
    shareLocation,
    goBack: () => router.back(),
  };
}
