import { Customer, Service, Appointment, QueueCustomer } from "@/models/types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    method: string = "GET",
    body?: any
  ): Promise<T> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error(`API request failed (${endpoint}):`, error);
      throw error;
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>("/services");
  }

  async createService(service: Omit<Service, "id">): Promise<Service> {
    return this.request<Service>("/services", "POST", service);
  }

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    return this.request<Service>(`/services/${id}`, "PUT", service);
  }

  async deleteService(id: string): Promise<void> {
    await this.request(`/services/${id}`, "DELETE");
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>("/customers");
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`);
  }

  async createCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
    return this.request<Customer>("/customers", "POST", customer);
  }

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    return this.request<Customer>(`/customers/${id}`, "PUT", customer);
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.request(`/customers/${id}`, "DELETE");
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return this.request<Appointment[]>("/appointments");
  }

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return this.request<Appointment[]>(`/appointments?date=${date}`);
  }

  async getAppointmentsByCustomer(customerId: string): Promise<Appointment[]> {
    return this.request<Appointment[]>(`/appointments?customerId=${customerId}`);
  }

  async createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment> {
    return this.request<Appointment>("/appointments", "POST", appointment);
  }

  async updateAppointment(
    id: string,
    appointment: Partial<Appointment>
  ): Promise<Appointment> {
    return this.request<Appointment>(`/appointments/${id}`, "PUT", appointment);
  }

  async deleteAppointment(id: string): Promise<void> {
    await this.request(`/appointments/${id}`, "DELETE");
  }

  // Queue
  async getQueue(): Promise<QueueCustomer[]> {
    return this.request<QueueCustomer[]>("/queue");
  }

  async addToQueue(customer: Omit<QueueCustomer, "id">): Promise<QueueCustomer> {
    return this.request<QueueCustomer>("/queue", "POST", customer);
  }

  async removeFromQueue(id: string): Promise<void> {
    await this.request(`/queue/${id}`, "DELETE");
  }

  // Batch operations
  async syncData(
    services?: Service[],
    customers?: Customer[],
    appointments?: Appointment[]
  ): Promise<{ success: boolean }> {
    const payload = {
      ...(services && { services }),
      ...(customers && { customers }),
      ...(appointments && { appointments }),
    };
    return this.request("/sync", "POST", payload);
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request("/health");
  }
}

export const apiService = new ApiService();
