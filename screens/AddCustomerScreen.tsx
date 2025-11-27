import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { ScreenKeyboardAwareScrollView } from "@/components/ScreenKeyboardAwareScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function AddCustomerScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a customer name");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter a phone number");
      return;
    }
    // TODO: Save customer to storage using useAppData hook
    navigation.goBack();
  };

  return (
    <ScreenKeyboardAwareScrollView>
      <View style={styles.section}>
        <ThemedText style={styles.label}>Full Name *</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
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
        <ThemedText style={styles.label}>Phone Number *</ThemedText>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="(555) 123-4567"
          placeholderTextColor={theme.textSecondary}
          keyboardType="phone-pad"
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
        <ThemedText style={styles.label}>Email (Optional)</ThemedText>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="customer@email.com"
          placeholderTextColor={theme.textSecondary}
          keyboardType="email-address"
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
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: theme.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="save" size={20} color={theme.buttonText} />
          <ThemedText style={[styles.saveButtonText, { color: theme.buttonText }]}>
            Save Customer
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.cancelButton,
            {
              backgroundColor: theme.backgroundDefault,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText style={[styles.cancelButtonText, { color: theme.text }]}>
            Cancel
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
