import { Subject, TimeSlot, DAYS, TIME_SLOTS } from '@/app/types/timetable';

export function generateTimetable(subjects: Subject[]): TimeSlot[] {
  const schedule: TimeSlot[] = [];
  
  // Initialize empty schedule
  DAYS.forEach(day => {
    TIME_SLOTS.forEach(time => {
      schedule.push({ day, time, subject: null });
    });
  });

  // Track professor and subject slot usage
  const professorSlots = new Map<string, Set<string>>();
  const subjectSlotCount = new Map<string, number>();

  // Sort subjects by constraints (prioritize those with more constraints)
  const sortedSubjects = [...subjects].sort((a, b) => {
    const aConstraints = (a.preferredDays?.length || 0) + (a.preferredTimeSlots?.length || 0);
    const bConstraints = (b.preferredDays?.length || 0) + (b.preferredTimeSlots?.length || 0);
    return bConstraints - aConstraints;
  });

  // Assign slots for each subject
  sortedSubjects.forEach(subject => {
    let assignedHours = 0;
    const targetHours = subject.hoursPerWeek;

    // Get valid slots considering constraints
    const validSlots = schedule.filter(slot => {
      // Skip if already assigned
      if (slot.subject) return false;

      // Check preferred days
      if (subject.preferredDays && subject.preferredDays.length > 0) {
        if (!subject.preferredDays.includes(slot.day)) return false;
      }

      // Check preferred time slots
      if (subject.preferredTimeSlots && subject.preferredTimeSlots.length > 0) {
        if (!subject.preferredTimeSlots.includes(slot.time)) return false;
      }

      // Check professor availability
      const slotKey = `${slot.day}-${slot.time}`;
      const profSlots = professorSlots.get(subject.professor) || new Set();
      if (profSlots.has(slotKey)) return false;

      return true;
    });

    // Distribute slots evenly across days
    const slotsByDay = new Map<string, TimeSlot[]>();
    validSlots.forEach(slot => {
      if (!slotsByDay.has(slot.day)) {
        slotsByDay.set(slot.day, []);
      }
      slotsByDay.get(slot.day)!.push(slot);
    });

    // Assign slots trying to distribute across different days
    const days = Array.from(slotsByDay.keys());
    let dayIndex = 0;

    while (assignedHours < targetHours && validSlots.length > 0) {
      const currentDay = days[dayIndex % days.length];
      const daySlots = slotsByDay.get(currentDay) || [];

      if (daySlots.length > 0) {
        const slot = daySlots.shift()!;
        slot.subject = subject;

        // Track professor slot
        const slotKey = `${slot.day}-${slot.time}`;
        if (!professorSlots.has(subject.professor)) {
          professorSlots.set(subject.professor, new Set());
        }
        professorSlots.get(subject.professor)!.add(slotKey);

        assignedHours++;
      }

      dayIndex++;

      // Safety check to prevent infinite loop
      if (dayIndex > days.length * 20) break;
    }

    subjectSlotCount.set(subject.id, assignedHours);
  });

  return schedule;
}

export function validateTimetable(schedule: TimeSlot[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const professorSlots = new Map<string, Set<string>>();

  schedule.forEach(slot => {
    if (slot.subject) {
      const slotKey = `${slot.day}-${slot.time}`;
      const professor = slot.subject.professor;

      if (!professorSlots.has(professor)) {
        professorSlots.set(professor, new Set());
      }

      if (professorSlots.get(professor)!.has(slotKey)) {
        errors.push(`Professor ${professor} has overlapping classes at ${slot.day} ${slot.time}`);
      }

      professorSlots.get(professor)!.add(slotKey);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
