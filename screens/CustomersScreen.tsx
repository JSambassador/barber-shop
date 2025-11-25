import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_CUSTOMERS } from "@/models/mockData";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CustomersStackParamList } from "@/navigation/CustomersStackNavigator";

type NavigationProp = NativeStackNavigationProp<CustomersStackParamList>;

export default function CustomersScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers] = useState(MOCK_CUSTOMERS);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.backgroundRoot },
        ]}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
            },
          ]}
        >
          <Feather
            name="search"
            size={20}
            color={theme.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search customers..."
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View>

      <ScreenScrollView>
        <View style={styles.section}>
          {filteredCustomers.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Feather
                name="users"
                size={48}
                color={theme.textSecondary}
                style={styles.emptyIcon}
              />
              <ThemedText
                style={[styles.emptyText, { color: theme.textSecondary }]}
              >
                {searchQuery
                  ? "No customers found"
                  : "No customers yet"}
              </ThemedText>
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Pressable
                key={customer.id}
                onPress={() =>
                  navigation.navigate("CustomerProfile", {
                    customerId: customer.id,
                  })
                }
              >
                <Card style={styles.customerCard}>
                  <View style={styles.customerContent}>
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: theme.primary },
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.avatarText,
                          { color: theme.buttonText },
                        ]}
                      >
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </ThemedText>
                    </View>
                    <View style={styles.customerInfo}>
                      <ThemedText style={styles.customerName}>
                        {customer.name}
                      </ThemedText>
                      <ThemedText style={{ color: theme.textSecondary }}>
                        {customer.totalVisits} visits
                        {customer.lastVisit &&
                          ` • Last: ${new Date(
                            customer.lastVisit
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}`}
                      </ThemedText>
                    </View>
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={theme.textSecondary}
                    />
                  </View>
                </Card>
              </Pressable>
            ))
          )}
        </View>
      </ScreenScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  emptyCard: {
    padding: Spacing["3xl"],
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: Spacing.md,
  },
  emptyText: {
    textAlign: "center",
  },
  customerCard: {
    marginBottom: Spacing.md,
  },
  customerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
});
