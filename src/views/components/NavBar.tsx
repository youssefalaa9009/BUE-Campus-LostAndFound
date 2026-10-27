import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { House, Map as MapIcon, Package, Plus, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


type NavBarProps = {
  activeTab?: "Home" | "Map" | "Report" | "My Items" | "Profile";
  onTabPress?: (tab: string) => void;
};

export default function NavBar({
  activeTab = "Home",
  onTabPress,
}: NavBarProps) {
  const tabs = [
    { name: "Home", icon: House },
    { name: "Map", icon: MapIcon },
    { name: "My Items", icon: Package },
    { name: "Profile", icon: User },
  ];
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.navBar, { paddingBottom: 10 + insets.bottom }]}>
      {tabs.slice(0, 2).map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => onTabPress?.(tab.name)}
        >
          <tab.icon
            size={21}
            color={activeTab === tab.name ? "#197052" : "#68786D"}
          />
          <Text
            style={
              activeTab === tab.name ? styles.activeNavText : styles.navText
            }
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => onTabPress?.("Report")}
      >
        <Text style={styles.reportIcon}>+</Text>
        <Text
          style={activeTab === "Report" ? styles.activeNavText : styles.navText}
        >
          Report
        </Text>
      </TouchableOpacity>
      {tabs.slice(2).map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.navItem}
          onPress={() => onTabPress?.(tab.name)}
        >
          <tab.icon
            size={21}
            color={activeTab === tab.name ? "#197052" : "#68786D"}
          />
          <Text
            style={
              activeTab === tab.name ? styles.activeNavText : styles.navText
            }
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5EAE3",
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  navIcon: {
    fontSize: 21,
    color: "#68786D",
  },
  activeNavText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#197052",
  },
  navText: {
    fontSize: 9,
    color: "#68786D",
  },
  reportButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  reportIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#197052",
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    overflow: "hidden",
  },
});
