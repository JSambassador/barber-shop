import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_CUSTOMERS } from "@/models/mockData";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CustomersStackParamList } from "@/navigation/CustomersStackNavigator";
import { useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";

type NavigationProp = NativeStackNavigationProp<CustomersStackParamList>;

export default function CustomersScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);

  useFocusEffect(
    useCallback(() => {
      // Set header options with Add button
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("AddCustomer")}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
          >
            <Feather name="plus" size={24} color={theme.primary} />
          </Pressable>
        ),
      });
    }, [navigation, theme.primary])
  );

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCustomerItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("CustomerProfile", { customerId: item.id })}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Card style={styles.customerCard}>
        <View style={styles.customerHeader}>
          <View style={styles.customerInfo}>
            <ThemedText style={styles.customerName}>{item.name}</ThemedText>
            <ThemedText style={styles.customerPhone}>{item.phone}</ThemedText>
            {item.email && (
              <ThemedText style={styles.customerEmail}>{item.email}</ThemedText>
            )}
          </View>
          <View style={styles.customerStats}>
            <View style={styles.statBadge}>
              <ThemedText style={styles.statLabel}>Visits</ThemedText>
              <ThemedText style={styles.statValue}>{item.totalVisits}</ThemedText>
            </View>
          </View>
        </View>
        {item.lastVisit && (
          <View style={styles.lastVisitContainer}>
            <Feather name="clock" size={14} color={theme.textSecondary} />
            <ThemedText style={styles.lastVisitText}>
              Last visit: {new Date(item.lastVisit).toLocaleDateString()}
            </ThemedText>
          </View>
        )}
      </Card>
    </Pressable>
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
            placeholder={t('searchCustomers')}
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View>

      {filteredCustomers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="users" size={48} color={theme.textSecondary} />
          <ThemedText style={styles.emptyText}>
            {searchQuery ? t('noCustomers') : t('noCustomers')}
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            {searchQuery ? t('tryDifferentSearch') : t('addCustomer')}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={filteredCustomers}
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  customerCard: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  customerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  customerInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "600",
  },
  customerPhone: {
    fontSize: 14,
  },
  customerEmail: {
    fontSize: 12,
  },
  customerStats: {
    alignItems: "center",
  },
  statBadge: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  lastVisitContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  lastVisitText: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
