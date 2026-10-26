import { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ArrowLeft, Clock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QRCodeScan() {
  const [selectedRole, setSelectedRole] = useState<"Owner" | "Finder">("Owner");
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={17} color="#263b31"/>
          </TouchableOpacity>
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
                selectedRole === "Owner" && styles.selectedRole,
              ]}
              onPress={() => setSelectedRole("Owner")}
            >
              <Text
                style={[
                  styles.roleText,
                  selectedRole === "Owner" && styles.selectedRoleText,
                ]}
              >
                Owner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                selectedRole === "Finder" && styles.selectedRole,
              ]}
              onPress={() => setSelectedRole("Finder")}
            >
              <Text
                style={[
                  styles.roleText,
                  selectedRole === "Finder" && styles.selectedRoleText,
                ]}
              >
                Finder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>
          {selectedRole === "Owner"
            ? "Show this code to Finder when you meet. Once it's scanned, your keys are marked as returned."
            : "Scan the Owner's code when you meet. Once it's scanned, the keys are marked as returned."}
        </Text>
        <View style={styles.qrContainer}>
          <QRCode
            value="BUE-LOST-FOUND-PICKUP- 4821"
            size={150}
            backgroundColor="#FFFFFF"
            color="#111111"
          />
        </View>
        <Text style={styles.scanHelp}>Can't scan? Share this code</Text>
        <Text style={styles.pickupCode}>4821</Text>
        <View style={styles.expiryNotice}>
          <Clock size={17} color="#176B50" />
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
    backgroundColor: "#F3F6F0",
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
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8E0",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: -3,
    color: "#26352E",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111C16",
  },
  roleContainer: {
    borderWidth: 1,
    borderColor: "#8ca797",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 7,
    paddingTop: 4,
    marginBottom: 12,
  },
  prototypeText: {
    fontSize: 9,
    color: "#315a48",
    textAlign: "center",
    marginBottom: 6,
  },
  roleSwitch: {
    flexDirection: "row",
    backgroundColor: "#e5ece2",
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
    color: "#315A48",
  },
  selectedRoleText: {
    fontWeight: "600",
    color: "#15231b",
  },
  description: {
    fontSize: 11,
    lineHeight: 17,
    color: "#586d62",
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
    shadowColor: "#536557",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    marginBottom: 10,
  },
  scanHelp: {
    fontSize: 9,
    color: "#64736A",
    textAlign: "center",
    marginBottom: 3,
  },
  pickupCode: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 3,
    color: "#197052",
    textAlign: "center",
    marginBottom: 12,
  },
  expiryNotice: {
    height: 34,
    borderRadius: 13,
    backgroundColor: "#FCEBCF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    marginBottom: 12,
  },
  expiryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#99510a",
  },
  stepsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#e0e9df",
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
    backgroundColor: "#d6ebe1",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#287258",
  },
  stepText: {
    flex: 1,
    fontSize: 10,
    color: "#1c3026",
  },
});
