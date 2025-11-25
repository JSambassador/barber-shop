import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_APPOINTMENTS, MOCK_SERVICES, MOCK_CUSTOMERS } from "@/models/mockData";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { CalendarStackParamList } from "@/navigation/CalendarStackNavigator";

type DetailRouteProp = RouteProp<CalendarStackParamList, "AppointmentDetail">;

export default function AppointmentDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<DetailRouteProp>();
  const { appointmentId } = route.params;

  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === appointmentId);
  const customer = MOCK_CUSTOMERS.find(
    (c) => c.id === appointment?.customerId
  );
  const service = MOCK_SERVICES.find((s) => s.id === appointment?.serviceId);

  if (!appointment) {
    return (
      <View style={styles.container}>
        <ThemedText>Appointment not found</ThemedText>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return theme.success;
      case "pending":
        return theme.warning;
      case "cancelled":
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <Card>
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Date & Time</ThemedText>
            <ThemedText style={styles.value}>
              {new Date(appointment.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at {appointment.time}
            </ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Customer</ThemedText>
            <ThemedText style={styles.value}>
              {customer?.name || "Unknown"}
            </ThemedText>
          </View>
          <View
            style={[
              styles.detailRow,
              styles.detailRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <ThemedText style={styles.label}>Phone</ThemedText>
            <ThemedText style={styles.value}>
              {customer?.phone || "N/A"}
            </ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Service</ThemedText>
            <ThemedText style={styles.value}>
              {service?.name || "Unknown"}
            </ThemedText>
          </View>
          <View
            style={[
              styles.detailRow,
              styles.detailRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <ThemedText style={styles.label}>Duration</ThemedText>
            <ThemedText style={styles.value}>
              {service?.duration || 30} minutes
            </ThemedText>
          </View>
          <View
            style={[
              styles.detailRow,
              styles.detailRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <ThemedText style={styles.label}>Price</ThemedText>
            <ThemedText style={styles.value}>
              ${service?.price || 0}
            </ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Status</ThemedText>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(appointment.status) },
              ]}
            >
              <ThemedText
                style={[styles.statusText, { color: "#FFFFFF" }]}
              >
                {appointment.status}
              </ThemedText>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: theme.success }]}
          onPress={() => navigation.goBack()}
        >
          <Feather name="check" size={20} color="#FFFFFF" />
          <ThemedText style={[styles.actionButtonText, { color: "#FFFFFF" }]}>
            Mark Complete
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable
          style={[
            styles.actionButton,
            styles.actionButtonOutline,
            { borderColor: theme.error },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={20} color={theme.error} />
          <ThemedText
            style={[styles.actionButtonText, { color: theme.error }]}
          >
            Cancel Appointment
          </ThemedText>
        </Pressable>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  detailRow: {
    paddingVertical: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailRowBorder: {
    borderTopWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
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
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  actionButtonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
