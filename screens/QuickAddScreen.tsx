import React, { useState } from "react";
import { View, StyleSheet, Pressable, TextInput, Platform } from "react-native";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { MOCK_SERVICES } from "@/models/mockData";
import { useNavigation } from "@react-navigation/native";

export default function QuickAddScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [bookingType, setBookingType] = useState<"appointment" | "walkin">(
    "appointment"
  );
  const [customerName, setCustomerName] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.section}>
        <View style={styles.segmentControl}>
          <Pressable
            onPress={() => setBookingType("appointment")}
            style={[
              styles.segmentButton,
              bookingType === "appointment" && [
                styles.segmentButtonActive,
                { backgroundColor: theme.primary },
              ],
            ]}
          >
            <ThemedText
              style={[
                styles.segmentText,
                {
                  color:
                    bookingType === "appointment"
                      ? theme.buttonText
                      : theme.text,
                },
              ]}
            >
              Appointment
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setBookingType("walkin")}
            style={[
              styles.segmentButton,
              bookingType === "walkin" && [
                styles.segmentButtonActive,
                { backgroundColor: theme.primary },
              ],
            ]}
          >
            <ThemedText
              style={[
                styles.segmentText,
                {
                  color:
                    bookingType === "walkin" ? theme.buttonText : theme.text,
                },
              ]}
            >
              Walk-in
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.label}>Customer Name</ThemedText>
        <TextInput
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Enter customer name"
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundDefault,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.label}>Service</ThemedText>
        <View style={styles.serviceGrid}>
          {MOCK_SERVICES.map((service) => (
            <Pressable
              key={service.id}
              onPress={() => setSelectedService(service.id)}
              style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Card
                style={[
                  styles.serviceCard,
                  selectedService === service.id && [
                    styles.serviceCardSelected,
                    { borderColor: theme.primary, borderWidth: 2 },
                  ],
                ]}
              >
                <ThemedText style={styles.serviceName}>
                  {service.name}
                </ThemedText>
                <ThemedText style={{ color: theme.textSecondary }}>
                  ${service.price} • {service.duration} min
                </ThemedText>
              </Card>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.label}>Notes (Optional)</ThemedText>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any special notes"
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.backgroundDefault,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={handleSave}
          style={[
            styles.saveButton,
            { backgroundColor: theme.primary },
          ]}
        >
          <ThemedText
            style={[styles.saveButtonText, { color: theme.buttonText }]}
          >
            {bookingType === "appointment" ? "Book Appointment" : "Add to Queue"}
          </ThemedText>
        </Pressable>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  segmentControl: {
    flexDirection: "row",
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
    gap: Spacing.xs,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
    borderRadius: BorderRadius.sm,
  },
  segmentButtonActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  input: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Platform.OS === "ios" ? Spacing.md : Spacing.sm,
    borderRadius: BorderRadius.sm,
    fontSize: 16,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.md,
    textAlignVertical: "top",
  },
  serviceGrid: {
    gap: Spacing.md,
  },
  serviceCard: {
    padding: Spacing.lg,
  },
  serviceCardSelected: {},
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  saveButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
