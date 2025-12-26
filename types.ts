
export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  description: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export enum BookingStep {
  SERVICE_SELECTION,
  DATE_TIME_SELECTION,
  PROCESSING,
  CONFIRMED
}

export interface BookingState {
  service: Service | null;
  date: Date | null;
  time: string | null;
}
