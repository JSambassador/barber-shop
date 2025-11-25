import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "@/screens/CalendarScreen";
import AppointmentDetailScreen from "@/screens/AppointmentDetailScreen";

export type CalendarStackParamList = {
  Calendar: undefined;
  AppointmentDetail: { appointmentId: string };
};

const Stack = createNativeStackNavigator<CalendarStackParamList>();

export default function CalendarStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "Calendar" }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={{
          presentation: "modal",
          title: "Appointment Details",
        }}
      />
    </Stack.Navigator>
  );
}
