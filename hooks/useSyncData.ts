import { useState, useCallback } from "react";
import { apiService } from "@/services/ApiService";
import { storageService } from "@/services/StorageService";
import { Customer, Service, Appointment } from "@/models/types";

interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime?: Date;
  error?: string;
}

export function useSyncData() {
  const [status, setStatus] = useState<SyncStatus>({
    isSyncing: false,
  });

  const syncToServer = useCallback(async () => {
    try {
      setStatus((prev) => ({ ...prev, isSyncing: true, error: undefined }));

      const [services, customers, appointments] = await Promise.all([
        storageService.getServices(),
        storageService.getCustomers(),
        storageService.getAppointments(),
      ]);

      await apiService.syncData(services, customers, appointments);

      setStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: new Date(),
      }));

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sync failed";
      setStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const syncFromServer = useCallback(async () => {
    try {
      setStatus((prev) => ({ ...prev, isSyncing: true, error: undefined }));

      const [services, customers, appointments] = await Promise.all([
        apiService.getServices(),
        apiService.getCustomers(),
        apiService.getAppointments(),
      ]);

      await Promise.all([
        storageService.saveServices(services),
        storageService.saveCustomers(customers),
        storageService.saveAppointments(appointments),
      ]);

      setStatus((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: new Date(),
      }));

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sync failed";
      setStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: errorMessage,
      }));
      return false;
    }
  }, []);

  const checkServerHealth = useCallback(async (): Promise<boolean> => {
    try {
      await apiService.healthCheck();
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    ...status,
    syncToServer,
    syncFromServer,
    checkServerHealth,
  };
}
