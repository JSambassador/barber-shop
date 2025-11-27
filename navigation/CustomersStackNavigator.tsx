import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomersScreen from "@/screens/CustomersScreen";
import CustomerProfileScreen from "@/screens/CustomerProfileScreen";
import AddCustomerScreen from "@/screens/AddCustomerScreen";

export type CustomersStackParamList = {
  Customers: undefined;
  CustomerProfile: { customerId: string };
  AddCustomer: undefined;
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
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomerScreen}
        options={{ title: "Add New Customer" }}
      />
    </Stack.Navigator>
  );
}
