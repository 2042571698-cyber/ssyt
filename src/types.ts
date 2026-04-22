export interface HealthData {
  type: 'heartRate' | 'bloodPressure' | 'steps';
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  time: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}
