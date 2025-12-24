export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  totalVisits: number;
  lastVisit?: string;
  preferredServices: string[];
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  photo?: string;
  category?: "cut" | "beard" | "kids" | "other";
}

export interface Appointment {
  id: string;
  customerId: string;
  serviceId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export interface QueueCustomer {
  id: string;
  name: string;
  serviceId: string;
  addedAt: string;
  estimatedWaitTime: number;
}
