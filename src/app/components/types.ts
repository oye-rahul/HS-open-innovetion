export interface Subject {
  id: string;
  name: string;
  professor: string;
  preferredDay?: string;
  preferredTime?: string;
  color: string;
}

export interface TimeSlot {
  day: string;
  time: string;
  subject: Subject | null;
}

export interface Timetable {
  [day: string]: {
    [time: string]: Subject | null;
  };
}
