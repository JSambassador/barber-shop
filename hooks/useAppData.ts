import { useState, useEffect, useCallback } from "react";
import { Customer, Service, Appointment, QueueCustomer } from "@/models/types";
import { storageService } from "@/services/StorageService";

interface AppData {
  services: Service[];
  customers: Customer[];
  appointments: Appointment[];
  queue: QueueCustomer[];
  isLoading: boolean;
}

interface AppDataContextValue extends AppData {
  refreshData: () => Promise<void>;
  addCustomer: (customer: Customer) => Promise<void>;
  updateCustomer: (customer: Customer) => Promise<void>;
  addAppointment: (appointment: Appointment) => Promise<void>;
  updateAppointment: (appointment: Appointment) => Promise<void>;
  addToQueue: (customer: QueueCustomer) => Promise<void>;
  removeFromQueue: (customerId: string) => Promise<void>;
}

export function useAppData(): AppDataContextValue {
  const [data, setData] = useState<AppData>({
    services: [],
    customers: [],
    appointments: [],
    queue: [],
    isLoading: true,
  });

  const loadData = useCallback(async () => {
    try {
      const [services, customers, appointments, queue] = await Promise.all([
        storageService.getServices(),
        storageService.getCustomers(),
        storageService.getAppointments(),
        storageService.getQueue(),
      ]);

      setData({
        services,
        customers,
        appointments,
        queue,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load app data:", error);
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const refreshData = useCallback(async () => {
    setData((prev) => ({ ...prev, isLoading: true }));
    await loadData();
  }, [loadData]);

  const addCustomer = useCallback(
    async (customer: Customer) => {
      await storageService.addCustomer(customer);
      await refreshData();
    },
    [refreshData]
  );

  const updateCustomer = useCallback(
    async (customer: Customer) => {
      await storageService.updateCustomer(customer);
      await refreshData();
    },
    [refreshData]
  );

  const addAppointment = useCallback(
    async (appointment: Appointment) => {
      await storageService.addAppointment(appointment);
      await refreshData();
    },
    [refreshData]
  );

  const updateAppointment = useCallback(
    async (appointment: Appointment) => {
      await storageService.updateAppointment(appointment);
      await refreshData();
    },
    [refreshData]
  );

  const addToQueue = useCallback(
    async (customer: QueueCustomer) => {
      await storageService.addToQueue(customer);
      await refreshData();
    },
    [refreshData]
  );

  const removeFromQueue = useCallback(
    async (customerId: string) => {
      await storageService.removeFromQueue(customerId);
      await refreshData();
    },
    [refreshData]
  );

  useEffect(() => {
    storageService.initialize().then(() => loadData());
  }, [loadData]);

  return {
    ...data,
    refreshData,
    addCustomer,
    updateCustomer,
    addAppointment,
    updateAppointment,
    addToQueue,
    removeFromQueue,
  };
}
