import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { isReturned } from "@/services/myItemsService";

export function useItemDetailsViewModel() {
  const { title } = useLocalSearchParams<{ title?: string }>();
  const detailTitle = title ?? "Car keys, blue tag";
  const [returned, setReturned] = useState(isReturned(detailTitle));

  useFocusEffect(
    useCallback(() => {
      setReturned(isReturned(detailTitle));
    }, [detailTitle])
  );

  function claim() {
    if (returned) {
      Alert.alert("Already returned", "This item has been marked as returned.");
    } else {
      router.push("/chat");
    }
  }

  function share() {
    Alert.alert("Share item", "Share this listing with someone who may know the owner.");
  }

  return {
    detailTitle,
    claimLabel: returned ? "Item returned ✓" : "Claim this item",
    claim,
    share,
    goBack: () => router.back(),
  };
}
