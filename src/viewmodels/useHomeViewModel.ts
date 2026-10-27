import { router } from "expo-router";
import { goToTab } from "@/viewmodels/tabNavigation";

export function useHomeViewModel() {
  return {
    openNotifications: () => router.push("/notifications"),
    openMatches: () => goToTab("My Items"),
    openMap: () => goToTab("Map"),
    goToTab,
  };
}
