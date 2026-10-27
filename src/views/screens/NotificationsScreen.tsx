import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotificationsViewModel } from "@/viewmodels/useNotificationsViewModel";
import BackButton from "@/views/components/BackButton";
import {
    Check,
    Headphones,
    Link2,
    ShieldCheck,
} from "lucide-react-native";
import colors from "@/constants/colors";

function AlertChip({ label }: { label: string }) {
  return (
    <View className="rounded-full bg-accentSoft px-3 py-1.5">
      <Text className="text-[10px] font-semibold text-accentInk">{label}</Text>
    </View>
  );
}

function EarlierNotification({
  type,
  message,
  time,
}: {
  type: "check" | "security";
  message: string;
  time: string;
}) {
  const isCheck = type === "check";
  return (
    <View className="mb-3 flex-row items-start gap-3">
      <View
        className={`mt-1 h-8 w-8 items-center justify-center rounded-lg ${
          isCheck ? "bg-mint" : "bg-accentSoft"
        }`}
      >
        {isCheck ? (
          <Check size={17} color={colors.primary} strokeWidth={2} />
        ) : (
          <ShieldCheck size={17} color={colors.accentInk} strokeWidth={2} />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-[11px] font-semibold leading-4 text-ink">
          {message}
        </Text>
        <Text className="mt-0.5 text-[9px] text-muted">
          Yesterday, {time}
        </Text>
      </View>
    </View>
  );
}

export default function NotificationsScreen() {
  const vm = useNotificationsViewModel();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        <View className="mb-2 mt-1 flex-row items-center gap-2">
          <BackButton onPress={vm.goBack} />
          <Text className="flex-1 text-[14px] font-bold text-ink">
            Notifications
          </Text>
          <Pressable
            onPress={() => {}}
            accessibilityRole="button"
            className="rounded-full bg-surface2 px-2.5 py-2"
          >
            <Text className="text-center text-[8px] font-semibold leading-3 text-ink">
              Mark all as
              {"\n"}
              read
            </Text>
          </Pressable>
        </View>
        <Text className="mb-2 text-[10px] text-muted">
          Match alerts are on for
        </Text>
        <View className="mb-1 flex-row flex-wrap gap-1.5">
          {vm.alerts.map((alert) => <AlertChip key={alert} label={alert} />)}
        </View>
        <Pressable
          onPress={() => {}}
          accessibilityRole="button"
          className="mb-3 self-start rounded-full border border-line bg-transparent px-2.5 py-1"
        >
          <Text className="text-[9px] font-medium text-ink">
            + New alert
          </Text>
        </Pressable>
        <View className="mb-4 rounded-[18px] border border-primary bg-white p-2.5">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-[11px] font-bold text-ink">
              Possible Match
            </Text>
            <Text className="text-[9px] text-muted">8 min ago</Text>
          </View>
          <View className="mb-2 flex-row items-center gap-1">
            <View className="flex-1">
              <View className="h-[51px] items-center justify-center rounded-xl bg-accentSoft">
                <Headphones size={21} color={colors.accentInk} strokeWidth={0.8} />
              </View>
              <Text className="mt-2 text-[8px] text-muted">Your alert</Text>
              <Text className="mt-0.5 text-[10px] font-semibold leading-4 text-ink">
                Lost near lecture
                {"\n"}
                halls, Monday
              </Text>
            </View>
            <View className="mb-8 h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Link2 size={14} color="#ffffff" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <View className="h-[51px] items-center justify-center rounded-xl bg-mint">
                <Headphones size={21} color={colors.primary} strokeWidth={1.8} />
              </View>
              <Text className="mt-2 text-[8px] text-muted">Found item</Text>
              <Text className="mt-0.5 text-[10px] font-semibold leading-4 text-ink">
                Found in lecture
                {"\n"}
                hall G-6, today.
              </Text>
            </View>
          </View>
          <View className="mb-1.5 flex-row flex-wrap gap-1">
            <View className="rounded-full bg-surface2 px-2 py-1">
              <Text className="text-[8px] font-medium text-ink">
                Same category
              </Text>
            </View>
            <View className="rounded-full bg-surface2 px-2 py-1">
              <Text className="text-[8px] font-medium text-ink">
                Same building
              </Text>
            </View>
          </View>
          <View className="mb-2.5 flex-row">
            <View className="rounded-full bg-surface2 px-2 py-1">
              <Text className="text-[8px] font-medium text-ink">
                Same colour
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => {}}
              accessibilityRole="button"
              className="h-[30px] flex-1 items-center justify-center rounded-xl border border-line bg-white"
            >
              <Text className="text-[9px] font-semibold text-ink">
                Not mine
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {}}
              accessibilityRole="button"
              className="h-[30px] flex-1 items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-[9px] font-semibold text-white">
                View item
              </Text>
            </Pressable>
          </View>
        </View>
        <Text className="mb-3 text-[11px] font-bold text-ink">
          Earlier
        </Text>
        {vm.earlier.map((n) => (
          <EarlierNotification key={n.message} type={n.type} message={n.message} time={n.time} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
