import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_SERVICES } from "@/models/mockData";

export default function ServicesScreen() {
  const { theme } = useTheme();
  const [services] = useState(MOCK_SERVICES);

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        {services.map((service) => (
          <Card key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceContent}>
              <View style={styles.serviceInfo}>
                <ThemedText style={styles.serviceName}>
                  {service.name}
                </ThemedText>
                <ThemedText
                  style={[styles.serviceDesc, { color: theme.textSecondary }]}
                >
                  {service.description}
                </ThemedText>
                <View style={styles.serviceDetails}>
                  <View
                    style={[
                      styles.priceBadge,
                      { backgroundColor: theme.primary },
                    ]}
                  >
                    <ThemedText
                      style={[styles.priceText, { color: theme.buttonText }]}
                    >
                      ${service.price}
                    </ThemedText>
                  </View>
                  <ThemedText style={{ color: theme.textSecondary }}>
                    {service.duration} min
                  </ThemedText>
                </View>
              </View>
              <Pressable style={styles.editButton}>
                <Feather name="edit-2" size={20} color={theme.primary} />
              </Pressable>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Pressable
          style={[styles.addButton, { backgroundColor: theme.primary }]}
        >
          <Feather name="plus" size={20} color={theme.buttonText} />
          <ThemedText
            style={[styles.addButtonText, { color: theme.buttonText }]}
          >
            Add New Service
          </ThemedText>
        </Pressable>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  serviceCard: {
    marginBottom: Spacing.md,
  },
  serviceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  serviceDesc: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  serviceDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  priceBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
  },
  editButton: {
    padding: Spacing.sm,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
