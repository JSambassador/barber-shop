import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, Pressable } from "react-native";
import TodayStackNavigator from "@/navigation/TodayStackNavigator";
import CalendarStackNavigator from "@/navigation/CalendarStackNavigator";
import CustomersStackNavigator from "@/navigation/CustomersStackNavigator";
import MoreStackNavigator from "@/navigation/MoreStackNavigator";
import { useTheme } from "@/hooks/useTheme";

export type MainTabParamList = {
  TodayTab: undefined;
  CalendarTab: undefined;
  AddTab: undefined;
  CustomersTab: undefined;
  MoreTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="TodayTab"
      screenOptions={{
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TodayTab"
        component={TodayStackNavigator}
        options={{
          title: "Today",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={CalendarStackNavigator}
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={() => null}
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            (navigation as any).navigate("TodayTab", {
              screen: "QuickAdd",
            });
          },
        })}
      />
      <Tab.Screen
        name="CustomersTab"
        component={CustomersStackNavigator}
        options={{
          title: "Customers",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
