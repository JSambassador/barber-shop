import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodayScreen from "@/screens/TodayScreen";
import QuickAddScreen from "@/screens/QuickAddScreen";

export type TodayStackParamList = {
  Today: undefined;
  QuickAdd: undefined;
};

const Stack = createNativeStackNavigator<TodayStackParamList>();

export default function TodayStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Today"
        component={TodayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuickAdd"
        component={QuickAddScreen}
        options={{
          presentation: "modal",
          title: "New Booking",
        }}
      />
    </Stack.Navigator>
  );
}
