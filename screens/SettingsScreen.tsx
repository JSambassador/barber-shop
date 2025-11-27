import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Switch, ActivityIndicator } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { useColorScheme } from "react-native";
import { Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useSyncData } from "@/hooks/useSyncData";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const { isSyncing, lastSyncTime, error, syncToServer, syncFromServer, checkServerHealth } =
    useSyncData();
  const [serverOnline, setServerOnline] = useState(false);

  useEffect(() => {
    checkServerHealth().then(setServerOnline);
  }, [checkServerHealth]);

  const handleSyncToServer = async () => {
    const success = await syncToServer();
    if (success) {
      const isOnline = await checkServerHealth();
      setServerOnline(isOnline);
    }
  };

  const handleSyncFromServer = async () => {
    const success = await syncFromServer();
    if (success) {
      const isOnline = await checkServerHealth();
      setServerOnline(isOnline);
    }
  };

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Server Sync</ThemedText>
        <Card style={styles.card}>
          <View style={styles.syncHeader}>
            <View style={styles.serverStatus}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor: serverOnline ? "#4CAF50" : theme.border,
                  },
                ]}
              />
              <ThemedText style={styles.serverStatusText}>
                {serverOnline ? "Server Online" : "Server Offline"}
              </ThemedText>
            </View>
          </View>

          {error && (
            <ThemedText style={[styles.errorText, { color: "#F44336" }]}>
              {error}
            </ThemedText>
          )}

          {lastSyncTime && (
            <ThemedText style={[styles.syncTimeText, { color: theme.textSecondary }]}>
              Last synced: {lastSyncTime.toLocaleTimeString()}
            </ThemedText>
          )}

          <View style={styles.syncButtonsContainer}>
            <Pressable
              onPress={handleSyncToServer}
              disabled={isSyncing || !serverOnline}
              style={[
                styles.syncButton,
                {
                  backgroundColor: theme.primary,
                  opacity: isSyncing || !serverOnline ? 0.6 : 1,
                },
              ]}
            >
              {isSyncing ? (
                <ActivityIndicator color={theme.buttonText} size="small" />
              ) : (
                <Feather name="upload" size={18} color={theme.buttonText} />
              )}
              <ThemedText style={[styles.syncButtonText, { color: theme.buttonText }]}>
                {isSyncing ? "Syncing..." : "Upload Data"}
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={handleSyncFromServer}
              disabled={isSyncing || !serverOnline}
              style={[
                styles.syncButton,
                {
                  backgroundColor: theme.primary,
                  opacity: isSyncing || !serverOnline ? 0.6 : 1,
                },
              ]}
            >
              {isSyncing ? (
                <ActivityIndicator color={theme.buttonText} size="small" />
              ) : (
                <Feather name="download" size={18} color={theme.buttonText} />
              )}
              <ThemedText style={[styles.syncButtonText, { color: theme.buttonText }]}>
                {isSyncing ? "Syncing..." : "Download Data"}
              </ThemedText>
            </Pressable>
          </View>
        </Card>
      </View>

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
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  syncHeader: {
    marginBottom: Spacing.md,
  },
  serverStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  serverStatusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 13,
    marginBottom: Spacing.md,
  },
  syncTimeText: {
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  syncButtonsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  syncButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: 8,
  },
  syncButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
