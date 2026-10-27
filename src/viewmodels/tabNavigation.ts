import { router } from "expo-router";

const TAB_ROUTES = {
  Home: "/Homescreen",
  Map: "/campusMap",
  "My Items": "/myItems",
} as const;

export function goToTab(tab: string) {
  if (tab === "Report") {
    router.push("/reportItem");
  } else if (tab in TAB_ROUTES) {
    router.replace(TAB_ROUTES[tab as keyof typeof TAB_ROUTES]);
  }
}

export function goBackOrHome() {
  if (router.canGoBack()) {
    router.back();
  } else {
    goToTab("Home");
  }
}
