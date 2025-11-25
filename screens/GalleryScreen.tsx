import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export default function GalleryScreen() {
  const { theme } = useTheme();

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <Card style={styles.emptyCard}>
          <Feather
            name="image"
            size={64}
            color={theme.textSecondary}
            style={styles.emptyIcon}
          />
          <ThemedText
            style={[styles.emptyTitle, { color: theme.text }]}
          >
            No Photos Yet
          </ThemedText>
          <ThemedText
            style={[styles.emptyText, { color: theme.textSecondary }]}
          >
            Showcase your best work by adding photos to your gallery
          </ThemedText>
        </Card>
      </View>

      <View style={styles.section}>
        <Pressable
          style={[styles.addButton, { backgroundColor: theme.primary }]}
        >
          <Feather name="camera" size={20} color={theme.buttonText} />
          <ThemedText
            style={[styles.addButtonText, { color: theme.buttonText }]}
          >
            Add Photos
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
  emptyCard: {
    padding: Spacing["3xl"],
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
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
