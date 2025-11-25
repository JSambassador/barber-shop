import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_APPOINTMENTS, MOCK_SERVICES, MOCK_CUSTOMERS } from "@/models/mockData";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CalendarStackParamList } from "@/navigation/CalendarStackNavigator";

type NavigationProp = NativeStackNavigationProp<CalendarStackParamList>;

export default function CalendarScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments] = useState(MOCK_APPOINTMENTS);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const currentWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - today.getDay() + i);
    currentWeek.push(day);
  }

  const selectedAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
    );
  });

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <View style={styles.weekStrip}>
          {currentWeek.map((day, index) => {
            const isSelected =
              day.toISOString().split("T")[0] ===
              selectedDate.toISOString().split("T")[0];
            const isToday =
              day.toISOString().split("T")[0] ===
              today.toISOString().split("T")[0];

            return (
              <Pressable
                key={index}
                onPress={() => setSelectedDate(day)}
                style={({ pressed }) => [
                  styles.dayButton,
                  isSelected && [
                    styles.dayButtonSelected,
                    { backgroundColor: theme.primary },
                  ],
                  { opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <ThemedText
                  style={[
                    styles.dayName,
                    {
                      color: isSelected
                        ? theme.buttonText
                        : isToday
                        ? theme.primary
                        : theme.textSecondary,
                    },
                  ]}
                >
                  {weekDays[day.getDay()]}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.dayNumber,
                    { color: isSelected ? theme.buttonText : theme.text },
                  ]}
                >
                  {day.getDate()}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          {selectedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </ThemedText>

        {selectedAppointments.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Feather
              name="calendar"
              size={48}
              color={theme.textSecondary}
              style={styles.emptyIcon}
            />
            <ThemedText
              style={[styles.emptyText, { color: theme.textSecondary }]}
            >
              No appointments scheduled
            </ThemedText>
          </Card>
        ) : (
          selectedAppointments.map((apt) => {
            const customer = MOCK_CUSTOMERS.find((c) => c.id === apt.customerId);
            const service = MOCK_SERVICES.find((s) => s.id === apt.serviceId);
            return (
              <Pressable
                key={apt.id}
                onPress={() =>
                  navigation.navigate("AppointmentDetail", {
                    appointmentId: apt.id,
                  })
                }
              >
                <Card style={styles.appointmentCard}>
                  <View style={styles.appointmentContent}>
                    <View style={styles.timeContainer}>
                      <ThemedText style={styles.timeText}>{apt.time}</ThemedText>
                      <ThemedText
                        style={[
                          styles.durationText,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {service?.duration || 30} min
                      </ThemedText>
                    </View>
                    <View style={styles.appointmentInfo}>
                      <ThemedText style={styles.customerName}>
                        {customer?.name || "Unknown"}
                      </ThemedText>
                      <ThemedText style={{ color: theme.textSecondary }}>
                        {service?.name}
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
              </Pressable>
            );
          })
        )}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  weekStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  dayButton: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    minWidth: 45,
  },
  dayButtonSelected: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dayName: {
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.md,
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
  appointmentCard: {
    marginBottom: Spacing.md,
  },
  appointmentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    marginRight: Spacing.lg,
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
    fontWeight: "700",
  },
  durationText: {
    fontSize: 12,
    marginTop: Spacing.xs,
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
});
