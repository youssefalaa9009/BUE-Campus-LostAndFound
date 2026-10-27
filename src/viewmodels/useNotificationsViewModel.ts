import { router } from "expo-router";

type EarlierNotification = {
  type: "check" | "security";
  message: string;
  time: string;
};

const ALERTS = ["White earphones case", "Black umbrellas"];

const EARLIER: EarlierNotification[] = [
  { type: "check", message: "Your claim for the calculator was confirmed. Your pickup code 7310.", time: "14:05" },
];

export function useNotificationsViewModel() {
  return {
    alerts: ALERTS,
    earlier: EARLIER,
    goBack: () => (router.canGoBack() ? router.back() : router.replace("/Homescreen")),
  };
}
