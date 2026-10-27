import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Bell, Headphones, IdCard, Search, Filter } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/views/components/NavBar";
import { useHomeViewModel } from "@/viewmodels/useHomeViewModel";

export default function HomeScreen() {
  const vm = useHomeViewModel();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Good Morning, User</Text>
            <Text style={styles.heading}>What are you{"\n"}looking for?</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={vm.openNotifications}
          >
           <Bell size={22} color="#173D30"/>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Search size={17} color="#176B50"/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search items, e.g keys"
            placeholderTextColor="#7A817D"
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => console.log("Open filters")}
          >
            <Filter size={17} color="#176B50" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.matchCard}
          onPress={vm.openMatches}
        >
          <View style={styles.matchIconBox}>
            <Headphones size={25} color="#176B50"/>
          </View>
          <View style={styles.matchTextContainer}>
            <Text style={styles.matchTitle}>We found 2 possible matches.</Text>
            <Text style={styles.matchDescription}>
              For your white earphones case
            </Text>
          </View>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </View>
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          <TouchableOpacity style={styles.activeCategory}>
            <Text style={styles.activeCategorytext}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>ID cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Keys</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Earphones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.categoryText}>Bags</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently found</Text>
          <TouchableOpacity onPress={vm.openMap}>
            <Text style={styles.mapLink}>See on map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsGrid}>
          <TouchableOpacity style={styles.itemsCard}>
            <View style={styles.itemImage}>
              <IdCard size={36} color="#176B50"/>
            </View>
            <Text style={styles.itemName}>Student ID Card</Text>
            <Text style={styles.itemLocation}>Library, 2nd floor</Text>
            <Text style={styles.itemTime}>12 min ago</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemsCard}>
            <View style={styles.itemImage}>
              <Headphones size={36} color="#176B50"/>
            </View>
            <Text style={styles.itemName}>Headphones</Text>
            <Text style={styles.itemLocation}>Engineering, 1st floor</Text>
            <Text style={styles.itemTime}>34 min ago</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar
        activeTab="Home"
        onTabPress={vm.goToTab}
      />
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111B16",
    lineHeight: 31,
  },
  heading: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111B16",
    lineHeight: 31,
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E8DF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#F5A33B",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE5DC",
    borderRadius: 16,
    height: 50,
    paddingLeft: 14,
    paddingRight: 5,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1B2922",
    paddingVertical: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D6EDE2",
    justifyContent: "center",
    alignItems: "center",
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#176B50",
    borderRadius: 24,
    padding: 15,
    minHeight: 105,
    marginBottom: 18,
  },
  matchIconBox: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  matchIcon: {
    fontSize: 25,
    color: "#176B50",
  },
  matchTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  matchTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 19,
  },
  matchDescription: {
    fontSize: 13,
    color: "#E7F2EC",
    marginTop: 5,
    lineHeight: 17,
  },
  viewButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  viewButtonText: {
    color: "#176B50",
    fontWeight: "700",
    fontSize: 13,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 5,
  },
  activeCategory: {
    backgroundColor: "#14251D",
    borderRadius: 25,
    paddingHorizontal: 17,
    paddingVertical: 11,
  },
  activeCategorytext: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  category: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#DDE5DC",
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  categoryText: {
    color: "#1D2C24",
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#14251D",
  },
  mapLink: {
    fontSize: 12,
    color: "#176B50",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  itemsCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DDE5DC",
    padding: 7,
    paddingBottom: 12,
  },
  itemImage: {
    height: 98,
    backgroundColor: "#D5EDE2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  itemIcon: {
    fontSize: 36,
    color: "#176B50",
  },
  itemName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#18251E",
    marginHorizontal: 4,
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 11,
    color: "#626F66",
    marginHorizontal: 4,
    marginBottom: 4,
  },
  itemTime: {
    fontSize: 11,
    color: "#626F66",
    marginHorizontal: 4,
  },
});
