import React, { useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_APPOINTMENTS, MOCK_QUEUE, MOCK_SERVICES, MOCK_CUSTOMERS } from "@/models/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

export default function TodayScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.toISOString().split("T")[0] ===
      today.toISOString().split("T")[0]
    );
  });

  const completedCount = todayAppointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "completed"
  ).length;
  const totalRevenue = todayAppointments.reduce((sum, apt) => {
    const service = MOCK_SERVICES.find((s) => s.id === apt.serviceId);
    return sum + (service?.price || 0);
  }, 0);

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter((q) => q.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + Spacing.lg, backgroundColor: theme.backgroundRoot },
        ]}
      >
        <View style={styles.headerLeft}>
          <Image
            source={require("../attached_assets/generated_images/barbershop_app_icon_design.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerCenter}>
          <ThemedText style={styles.dateText}>{dateString}</ThemedText>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={24} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <ScreenScrollView contentContainerStyle={styles.scrollContent}>
        {queue.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Walk-in Queue</ThemedText>
            {queue.map((customer, index) => {
              const service = MOCK_SERVICES.find((s) => s.id === customer.serviceId);
              return (
                <Card key={customer.id} style={styles.queueCard}>
                  <View style={styles.queueContent}>
                    <View
                      style={[
                        styles.queuePosition,
                        { backgroundColor: theme.primary },
                      ]}
                    >
                      <ThemedText
                        style={[
                          styles.queuePositionText,
                          { color: theme.buttonText },
                        ]}
                      >
                        {index + 1}
                      </ThemedText>
                    </View>
                    <View style={styles.queueInfo}>
                      <ThemedText style={styles.queueName}>
                        {customer.name}
                      </ThemedText>
                      <ThemedText style={{ color: theme.textSecondary }}>
                        {service?.name} • {customer.estimatedWaitTime} min wait
                      </ThemedText>
                    </View>
                    <Pressable
                      onPress={() => removeFromQueue(customer.id)}
                      style={({ pressed }) => [
                        styles.queueAction,
                        { opacity: pressed ? 0.5 : 1 },
                      ]}
                    >
                      <Feather name="check" size={24} color={theme.success} />
                    </Pressable>
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Today's Schedule</ThemedText>
          {todayAppointments.length === 0 ? (
            <Card style={styles.emptyCard}>
              <ThemedText style={{ color: theme.textSecondary, textAlign: "center" }}>
                No appointments scheduled for today
              </ThemedText>
            </Card>
          ) : (
            todayAppointments.map((apt) => {
              const customer = MOCK_CUSTOMERS.find((c) => c.id === apt.customerId);
              const service = MOCK_SERVICES.find((s) => s.id === apt.serviceId);
              return (
                <Card key={apt.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentContent}>
                    <View style={styles.timeContainer}>
                      <ThemedText style={styles.timeText}>{apt.time}</ThemedText>
                    </View>
                    <View style={styles.appointmentInfo}>
                      <ThemedText style={styles.customerName}>
                        {customer?.name || "Unknown"}
                      </ThemedText>
                      <ThemedText style={{ color: theme.textSecondary }}>
                        {service?.name} • ${service?.price}
                      </ThemedText>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            apt.status === "confirmed"
                              ? theme.success
                              : apt.status === "pending"
                              ? theme.warning
                              : theme.error,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[styles.statusText, { color: "#FFFFFF" }]}
                      >
                        {apt.status}
                      </ThemedText>
                    </View>
                  </View>
                </Card>
              );
            })
          )}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Stats</ThemedText>
          <Card>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>
                  {todayAppointments.length}
                </ThemedText>
                <ThemedText style={{ color: theme.textSecondary }}>
                  Total
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>
                  {completedCount}
                </ThemedText>
                <ThemedText style={{ color: theme.textSecondary }}>
                  Completed
                </ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>
                  ${totalRevenue}
                </ThemedText>
                <ThemedText style={{ color: theme.textSecondary }}>
                  Revenue
                </ThemedText>
              </View>
            </View>
          </Card>
        </View>
      </ScreenScrollView>

      <Pressable
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary,
            bottom: tabBarHeight + Spacing.xl,
          },
        ]}
      >
        <Feather name="user-plus" size={24} color={theme.buttonText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    width: 40,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  iconButton: {
    padding: Spacing.xs,
  },
  scrollContent: {
    paddingBottom: Spacing["5xl"],
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  queueCard: {
    marginBottom: Spacing.md,
  },
  queueContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  queuePosition: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  queuePositionText: {
    fontSize: 18,
    fontWeight: "700",
  },
  queueInfo: {
    flex: 1,
  },
  queueName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  queueAction: {
    padding: Spacing.sm,
  },
  appointmentCard: {
    marginBottom: Spacing.md,
  },
  appointmentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    marginRight: Spacing.lg,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "700",
  },
  appointmentInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  emptyCard: {
    padding: Spacing.xl,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Spacing.xs,
  },
  fab: {
    position: "absolute",
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
});
