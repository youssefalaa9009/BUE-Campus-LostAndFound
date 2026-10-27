import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { MyItem, MyItemStatus } from "@/models/myItem";
import { getMyItems } from "@/services/myItemsService";
import { goToTab } from "@/viewmodels/tabNavigation";

const TABS: MyItemStatus[] = ["Lost", "Found"];

export function useMyItemsViewModel() {
  const [items, setItems] = useState<MyItem[]>(getMyItems());
  const [itemTab, setItemTab] = useState<MyItemStatus>("Lost");

  useFocusEffect(
    useCallback(() => {
      setItems(getMyItems());
    }, [])
  );

  function openDetails(title: string) {
    router.push({ pathname: "/itemDetails", params: { title } });
  }

  function openPickupCode() {
    router.push({ pathname: "/chat", params: { showCode: "1" } });
  }

  function review() {
    Alert.alert("Possible matches", "Two possible matches found. Open a match to compare item details.", [
      { text: "View car keys", onPress: () => openDetails("Car keys, blue tag") },
      { text: "Close", style: "cancel" },
    ]);
  }

  function actionFor(item: MyItem) {
    if (item.id === 1) return { title: "Review", light: false, onPress: review };
    if (item.id === 2 && item.step < 4) return { title: "Pickup code", light: false, onPress: openPickupCode };
    if (item.step === 4) return { title: "View details", light: true, onPress: () => openDetails(item.title) };
    return { title: "View", light: false, onPress: () => openDetails(item.title) };
  }

  const tabs = TABS.map((tab) => ({
    tab,
    label: `${tab} (${items.filter((item) => item.status === tab).length})`,
    selected: tab === itemTab,
  }));

  const cards = items
    .filter((item) => item.status === itemTab)
    .map((item) => ({
      ...item,
      badge: item.step === 4 ? "Returned" : item.status,
      action: actionFor(item),
    }));

  return {
    tabs,
    selectTab: setItemTab,
    cards,
    openDetails,
    reportItem: () => router.push("/reportItem"),
    goToTab,
  };
}
