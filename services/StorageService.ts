import AsyncStorage from "@react-native-async-storage/async-storage";
import { Customer, Service, Appointment, QueueCustomer } from "@/models/types";
import { MOCK_SERVICES, MOCK_CUSTOMERS, MOCK_APPOINTMENTS, MOCK_QUEUE } from "@/models/mockData";

const STORAGE_KEYS = {
  SERVICES: "barbershop_services",
  CUSTOMERS: "barbershop_customers",
  APPOINTMENTS: "barbershop_appointments",
  QUEUE: "barbershop_queue",
  INITIALIZED: "barbershop_initialized",
};

class StorageService {
  private initialized = false;

  async initialize(): Promise<void> {
    try {
      if (this.initialized) return;

      // Check if app has been initialized before
      const isInitialized = await AsyncStorage.getItem(STORAGE_KEYS.INITIALIZED);

      if (!isInitialized) {
        // First time: seed with mock data
        await Promise.all([
          AsyncStorage.setItem(
            STORAGE_KEYS.SERVICES,
            JSON.stringify(MOCK_SERVICES)
          ),
          AsyncStorage.setItem(
            STORAGE_KEYS.CUSTOMERS,
            JSON.stringify(MOCK_CUSTOMERS)
          ),
          AsyncStorage.setItem(
            STORAGE_KEYS.APPOINTMENTS,
            JSON.stringify(MOCK_APPOINTMENTS)
          ),
          AsyncStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(MOCK_QUEUE)),
          AsyncStorage.setItem(STORAGE_KEYS.INITIALIZED, "true"),
        ]);
      }

      this.initialized = true;
    } catch (error) {
      console.error("Storage initialization failed:", error);
      this.initialized = true; // Mark as initialized even on error to prevent loops
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get services:", error);
      return [];
    }
  }

  async saveServices(services: Service[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (error) {
      console.error("Failed to save services:", error);
    }
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get customers:", error);
      return [];
    }
  }

  async saveCustomers(customers: Customer[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch (error) {
      console.error("Failed to save customers:", error);
    }
  }

  async addCustomer(customer: Customer): Promise<void> {
    const customers = await this.getCustomers();
    customers.push(customer);
    await this.saveCustomers(customers);
  }

  async updateCustomer(customer: Customer): Promise<void> {
    const customers = await this.getCustomers();
    const index = customers.findIndex((c) => c.id === customer.id);
    if (index >= 0) {
      customers[index] = customer;
      await this.saveCustomers(customers);
    }
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get appointments:", error);
      return [];
    }
  }

  async saveAppointments(appointments: Appointment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (error) {
      console.error("Failed to save appointments:", error);
    }
  }

  async addAppointment(appointment: Appointment): Promise<void> {
    const appointments = await this.getAppointments();
    appointments.push(appointment);
    await this.saveAppointments(appointments);

    // Update customer's last visit if it's completed
    if (appointment.status === "completed") {
      const customers = await this.getCustomers();
      const customer = customers.find((c) => c.id === appointment.customerId);
      if (customer) {
        customer.lastVisit = appointment.date;
        customer.totalVisits += 1;
        await this.updateCustomer(customer);
      }
    }
  }

  async updateAppointment(appointment: Appointment): Promise<void> {
    const appointments = await this.getAppointments();
    const index = appointments.findIndex((a) => a.id === appointment.id);
    if (index >= 0) {
      appointments[index] = appointment;
      await this.saveAppointments(appointments);

      // Update customer stats if completed
      if (appointment.status === "completed") {
        const customers = await this.getCustomers();
        const customer = customers.find((c) => c.id === appointment.customerId);
        if (customer && customer.lastVisit !== appointment.date) {
          customer.lastVisit = appointment.date;
          customer.totalVisits += 1;
          await this.updateCustomer(customer);
        }
      }
    }
  }

  // Queue
  async getQueue(): Promise<QueueCustomer[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.QUEUE);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get queue:", error);
      return [];
    }
  }

  async saveQueue(queue: QueueCustomer[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error("Failed to save queue:", error);
    }
  }

  async addToQueue(customer: QueueCustomer): Promise<void> {
    const queue = await this.getQueue();
    queue.push(customer);
    await this.saveQueue(queue);
  }

  async removeFromQueue(customerId: string): Promise<void> {
    const queue = await this.getQueue();
    const filtered = queue.filter((c) => c.id !== customerId);
    await this.saveQueue(filtered);
  }

  // Clear all data (for testing)
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  }
}

export const storageService = new StorageService();
