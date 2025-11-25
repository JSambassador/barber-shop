import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomersScreen from "@/screens/CustomersScreen";
import CustomerProfileScreen from "@/screens/CustomerProfileScreen";

export type CustomersStackParamList = {
  Customers: undefined;
  CustomerProfile: { customerId: string };
};

const Stack = createNativeStackNavigator<CustomersStackParamList>();

export default function CustomersStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Customers"
        component={CustomersScreen}
        options={{ title: "Customers" }}
      />
      <Stack.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{ title: "Customer Profile" }}
      />
    </Stack.Navigator>
  );
}
