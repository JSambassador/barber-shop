import { Customer, Service, Appointment, QueueCustomer } from "./types";

export const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Classic Cut",
    description: "Traditional haircut with scissors and clippers",
    price: 35,
    duration: 30,
  },
  {
    id: "2",
    name: "Fade",
    description: "Modern fade haircut with precision blending",
    price: 40,
    duration: 45,
  },
  {
    id: "3",
    name: "Beard Trim",
    description: "Professional beard shaping and trimming",
    price: 20,
    duration: 15,
  },
  {
    id: "4",
    name: "Kids Cut",
    description: "Haircut for children 12 and under",
    price: 25,
    duration: 25,
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Michael Johnson",
    phone: "(555) 123-4567",
    email: "michael.j@email.com",
    totalVisits: 12,
    lastVisit: "2024-11-20",
    preferredServices: ["1", "3"],
  },
  {
    id: "2",
    name: "David Smith",
    phone: "(555) 234-5678",
    email: "david.s@email.com",
    totalVisits: 8,
    lastVisit: "2024-11-18",
    preferredServices: ["2"],
  },
  {
    id: "3",
    name: "Robert Williams",
    phone: "(555) 345-6789",
    totalVisits: 15,
    lastVisit: "2024-11-22",
    preferredServices: ["1"],
  },
];

const today = new Date().toISOString().split("T")[0];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    customerId: "1",
    serviceId: "1",
    date: today,
    time: "09:00",
    status: "confirmed",
  },
  {
    id: "2",
    customerId: "2",
    serviceId: "2",
    date: today,
    time: "10:00",
    status: "confirmed",
  },
  {
    id: "3",
    customerId: "3",
    serviceId: "3",
    date: today,
    time: "14:00",
    status: "pending",
  },
];

export const MOCK_QUEUE: QueueCustomer[] = [
  {
    id: "q1",
    name: "James Brown",
    serviceId: "2",
    addedAt: new Date().toISOString(),
    estimatedWaitTime: 15,
  },
];
