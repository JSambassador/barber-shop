import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export default function ShopProfileScreen() {
  const { theme } = useTheme();

  const shopInfo = {
    name: "The Daily Grind",
    address: "123 Main Street, Anytown, USA",
    phone: "(555) 987-6543",
    email: "contact@dailygrind.com",
    hours: "Mon-Fri: 9AM-6PM\nSat: 10AM-5PM\nSun: Closed",
  };

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        <Card>
          <View style={styles.logoContainer}>
            <Image
              source={require("../attached_assets/generated_images/barbershop_app_icon_design.png")}
              style={styles.logo}
            />
            <Pressable
              style={[
                styles.changePhotoButton,
                { backgroundColor: theme.primary },
              ]}
            >
              <Feather name="camera" size={16} color={theme.buttonText} />
            </Pressable>
          </View>
          <ThemedText style={styles.shopName}>{shopInfo.name}</ThemedText>
        </Card>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Business Information</ThemedText>
        <Card>
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>
              {shopInfo.address}
            </ThemedText>
          </View>
          <View
            style={[
              styles.infoRow,
              styles.infoRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <Feather name="phone" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>{shopInfo.phone}</ThemedText>
          </View>
          <View
            style={[
              styles.infoRow,
              styles.infoRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <Feather name="mail" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>{shopInfo.email}</ThemedText>
          </View>
          <View
            style={[
              styles.infoRow,
              styles.infoRowBorder,
              { borderTopColor: theme.border },
            ]}
          >
            <Feather name="clock" size={20} color={theme.textSecondary} />
            <ThemedText style={styles.infoText}>{shopInfo.hours}</ThemedText>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Pressable
          style={[
            styles.editButton,
            { borderColor: theme.primary, backgroundColor: theme.primary },
          ]}
        >
          <ThemedText
            style={[styles.editButtonText, { color: theme.buttonText }]}
          >
            Edit Profile
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
  logoContainer: {
    alignItems: "center",
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: Spacing.md,
    right: "35%",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  shopName: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: Spacing.md,
  },
  infoRowBorder: {
    borderTopWidth: 1,
  },
  infoText: {
    marginLeft: Spacing.md,
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
