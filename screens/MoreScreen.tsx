import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MoreStackParamList } from "@/navigation/MoreStackNavigator";

type NavigationProp = NativeStackNavigationProp<MoreStackParamList>;

export default function MoreScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    {
      icon: "scissors",
      title: "Services",
      subtitle: "Manage your service catalog",
      onPress: () => navigation.navigate("Services"),
    },
    {
      icon: "home",
      title: "Shop Profile",
      subtitle: "Business info and details",
      onPress: () => navigation.navigate("ShopProfile"),
    },
    {
      icon: "image",
      title: "Gallery",
      subtitle: "Showcase your work",
      onPress: () => navigation.navigate("Gallery"),
    },
    {
      icon: "settings",
      title: "Settings",
      subtitle: "App preferences",
      onPress: () => navigation.navigate("Settings"),
    },
  ];

  return (
    <ScreenScrollView>
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <Pressable key={index} onPress={item.onPress}>
            <Card style={styles.menuCard}>
              <View style={styles.menuContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: theme.backgroundSecondary },
                  ]}
                >
                  <Feather name={item.icon as any} size={24} color={theme.primary} />
                </View>
                <View style={styles.menuInfo}>
                  <ThemedText style={styles.menuTitle}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={{ color: theme.textSecondary }}>
                    {item.subtitle}
                  </ThemedText>
                </View>
                <Feather
                  name="chevron-right"
                  size={20}
                  color={theme.textSecondary}
                />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.lg,
  },
  menuCard: {
    marginBottom: Spacing.md,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
});
