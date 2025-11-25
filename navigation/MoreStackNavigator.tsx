import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoreScreen from "@/screens/MoreScreen";
import ServicesScreen from "@/screens/ServicesScreen";
import ShopProfileScreen from "@/screens/ShopProfileScreen";
import GalleryScreen from "@/screens/GalleryScreen";
import SettingsScreen from "@/screens/SettingsScreen";

export type MoreStackParamList = {
  More: undefined;
  Services: undefined;
  ShopProfile: undefined;
  Gallery: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<MoreStackParamList>();

export default function MoreStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{ title: "More" }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ title: "Services" }}
      />
      <Stack.Screen
        name="ShopProfile"
        component={ShopProfileScreen}
        options={{ title: "Shop Profile" }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ title: "Gallery" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
