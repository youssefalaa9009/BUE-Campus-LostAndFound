import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Clock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePickupViewModel } from "@/viewmodels/usePickupViewModel";
import BackButton from "@/views/components/BackButton";
import colors from "@/constants/colors";

export default function PickupScreen() {
  const vm = usePickupViewModel();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BackButton onPress={vm.goBack} />
          <Text style={styles.headerTitle}>Pickup</Text>
        </View>
        <View style={styles.roleContainer}>
          <Text style={styles.prototypeText}>
            Prototype only: preview each side
          </Text>
          <View style={styles.roleSwitch}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                vm.selectedRole === "Owner" && styles.selectedRole,
              ]}
              onPress={() => vm.selectRole("Owner")}
            >
              <Text
                style={[
                  styles.roleText,
                  vm.selectedRole === "Owner" && styles.selectedRoleText,
                ]}
              >
                Owner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                vm.selectedRole === "Finder" && styles.selectedRole,
              ]}
              onPress={() => vm.selectRole("Finder")}
            >
              <Text
                style={[
                  styles.roleText,
                  vm.selectedRole === "Finder" && styles.selectedRoleText,
                ]}
              >
                Finder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>
          {vm.description}
        </Text>
        <View style={styles.qrContainer}>
          <QRCode
            value={vm.qrValue}
            size={150}
            backgroundColor="#FFFFFF"
            color="#111111"
          />
        </View>
        <Text style={styles.scanHelp}>Can't scan? Share this code</Text>
        <Text style={styles.pickupCode}>{vm.pickupCode}</Text>
        <View style={styles.expiryNotice}>
          <Clock size={17} color={colors.primary} />
          <Text style={styles.expiryText}>Valid for 14:52 - works once</Text>
        </View>
        <View style={styles.stepsCard}>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Meet Finder at the agreed place</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Let Finder scan your code</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Check your keys before you leave
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  roleContainer: {
    borderWidth: 1,
    borderColor: colors.muted,
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 7,
    paddingTop: 4,
    marginBottom: 12,
  },
  prototypeText: {
    fontSize: 9,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 6,
  },
  roleSwitch: {
    flexDirection: "row",
    backgroundColor: colors.surface2,
    borderRadius: 10,
    padding: 3,
  },
  roleButton: {
    flex: 1,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  selectedRole: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  roleText: {
    fontSize: 11,
    color: colors.ink,
  },
  selectedRoleText: {
    fontWeight: "600",
    color: colors.ink,
  },
  description: {
    fontSize: 11,
    lineHeight: 17,
    color: colors.muted,
    textAlign: "center",
    marginHorizontal: 2,
    marginBottom: 12,
  },
  qrContainer: {
    alignSelf: "center",
    width: 177,
    height: 177,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.muted,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    marginBottom: 10,
  },
  scanHelp: {
    fontSize: 9,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 3,
  },
  pickupCode: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 3,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  expiryNotice: {
    height: 34,
    borderRadius: 13,
    backgroundColor: colors.accentSoft,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    marginBottom: 12,
  },
  expiryText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.accentInk,
  },
  stepsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 9,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    minHeight: 18,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 10,
    color: colors.ink,
  },
});
