import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { MOCK_CUSTOMERS, MOCK_APPOINTMENTS, MOCK_SERVICES } from "@/models/mockData";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { CustomersStackParamList } from "@/navigation/CustomersStackNavigator";

type ProfileRouteProp = RouteProp<CustomersStackParamList, "CustomerProfile">;

export default function CustomerProfileScreen() {
  const { theme } = useTheme();
  const route = useRoute<ProfileRouteProp>();
  const { customerId } = route.params;

  const customer = MOCK_CUSTOMERS.find((c) => c.id === customerId);
  const customerAppointments = MOCK_APPOINTMENTS.filter(
    (apt) => apt.customerId === customerId
  );

  if (!customer) {
    return (
      <View style={styles.container}>
        <ThemedText>Customer not found</ThemedText>
      </View>
    );
  }

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <Card>
          <View style={styles.profileHeader}>
            <View
              style={[styles.largeAvatar, { backgroundColor: theme.primary }]}
            >
              <ThemedText
                style={[styles.largeAvatarText, { color: theme.buttonText }]}
              >
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </ThemedText>
            </View>
            <ThemedText style={styles.customerName}>
              {customer.name}
            </ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.infoRow}>
            <Feather name="phone" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>{customer.phone}</ThemedText>
          </View>
          {customer.email && (
            <View style={[styles.infoRow, styles.infoRowBorder, { borderTopColor: theme.border }]}>
              <Feather name="mail" size={20} color={theme.textSecondary} />
              <ThemedText style={styles.infoText}>{customer.email}</ThemedText>
            </View>
          )}
          <View style={[styles.infoRow, styles.infoRowBorder, { borderTopColor: theme.border }]}>
            <Feather name="activity" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>
              {customer.totalVisits} total visits
            </ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Visit History</ThemedText>
        {customerAppointments.length === 0 ? (
          <Card style={styles.emptyCard}>
            <ThemedText style={{ color: theme.textSecondary, textAlign: "center" }}>
              No appointments yet
            </ThemedText>
          </Card>
        ) : (
          customerAppointments.map((apt) => {
            const service = MOCK_SERVICES.find((s) => s.id === apt.serviceId);
            return (
              <Card key={apt.id} style={styles.appointmentCard}>
                <View style={styles.appointmentContent}>
                  <View style={styles.appointmentLeft}>
                    <ThemedText style={styles.appointmentDate}>
                      {new Date(apt.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </ThemedText>
                    <ThemedText style={{ color: theme.textSecondary }}>
                      {apt.time}
                    </ThemedText>
                  </View>
                  <View style={styles.appointmentRight}>
                    <ThemedText style={styles.serviceName}>
                      {service?.name}
                    </ThemedText>
                    <ThemedText style={{ color: theme.textSecondary }}>
                      ${service?.price}
                    </ThemedText>
                  </View>
                </View>
              </Card>
            );
          })
        )}
      </View>

      <View style={styles.section}>
        <Pressable
          style={[styles.bookButton, { backgroundColor: theme.primary }]}
        >
          <ThemedText
            style={[styles.bookButtonText, { color: theme.buttonText }]}
          >
            Book Appointment
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
  profileHeader: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  largeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  largeAvatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  customerName: {
    fontSize: 24,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  infoRowBorder: {
    borderTopWidth: 1,
  },
  infoText: {
    marginLeft: Spacing.md,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  emptyCard: {
    padding: Spacing.xl,
  },
  appointmentCard: {
    marginBottom: Spacing.md,
  },
  appointmentContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appointmentLeft: {},
  appointmentDate: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  appointmentRight: {
    alignItems: "flex-end",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  bookButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
