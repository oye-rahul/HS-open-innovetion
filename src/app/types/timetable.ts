export interface Subject {
  id: string;
  name: string;
  professor: string;
  preferredDays?: string[];
  preferredTimeSlots?: string[];
  hoursPerWeek: number;
  color: string;
}

export interface TimeSlot {
  day: string;
  time: string;
  subject: Subject | null;
}

export interface TimetableData {
  subjects: Subject[];
  schedule: TimeSlot[];
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export const SUBJECT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#14B8A6', // Teal
  '#6366F1', // Indigo
];
