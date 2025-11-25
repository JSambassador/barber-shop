import React, { useState } from "react";
import { View, StyleSheet, Pressable, Switch } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { useColorScheme } from "react-native";
import { Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
        <Card>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Feather name="moon" size={20} color={theme.textSecondary} />
              <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
        <Card>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Feather name="bell" size={20} color={theme.textSecondary} />
              <ThemedText style={styles.settingText}>
                Appointment Reminders
              </ThemedText>
            </View>
            <Switch
              value={true}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View
            style={[
              styles.settingRow,
              styles.settingRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <Feather
                name="message-circle"
                size={20}
                color={theme.textSecondary}
              />
              <ThemedText style={styles.settingText}>
                New Bookings
              </ThemedText>
            </View>
            <Switch
              value={true}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        <Pressable>
          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Feather name="log-out" size={20} color={theme.error} />
                <ThemedText style={[styles.settingText, { color: theme.error }]}>
                  Sign Out
                </ThemedText>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>

      <View style={styles.section}>
        <ThemedText
          style={[styles.versionText, { color: theme.textSecondary }]}
        >
          Version 1.0.0
        </ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
  },
  settingRowBorder: {
    borderTopWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    marginLeft: Spacing.md,
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    fontSize: 14,
  },
});
