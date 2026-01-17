import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { Subject, SUBJECT_COLORS, DAYS, TIME_SLOTS } from '@/app/types/timetable';

interface SubjectFormData {
  name: string;
  professor: string;
  hoursPerWeek: number;
  preferredDays: string[];
  preferredTimeSlots: string[];
}

interface TimetableFormProps {
  subjects: Subject[];
  onAddSubject: (subject: Subject) => void;
  onRemoveSubject: (id: string) => void;
  onGenerateTimetable: () => void;
}

export function TimetableForm({
  subjects,
  onAddSubject,
  onRemoveSubject,
  onGenerateTimetable,
}: TimetableFormProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormData>({
    defaultValues: {
      hoursPerWeek: 3,
    },
  });

  const onSubmit = (data: SubjectFormData) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: data.name,
      professor: data.professor,
      hoursPerWeek: data.hoursPerWeek,
      preferredDays: selectedDays.length > 0 ? selectedDays : undefined,
      preferredTimeSlots: selectedTimeSlots.length > 0 ? selectedTimeSlots : undefined,
      color: SUBJECT_COLORS[subjects.length % SUBJECT_COLORS.length],
    };

    onAddSubject(newSubject);
    reset();
    setSelectedDays([]);
    setSelectedTimeSlots([]);
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setSelectedTimeSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-600" />
          Add Subject
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Name *
              </label>
              <input
                {...register('name', { required: 'Subject name is required' })}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Data Structures"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professor Name *
              </label>
              <input
                {...register('professor', { required: 'Professor name is required' })}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Dr. Smith"
              />
              {errors.professor && (
                <p className="mt-1 text-sm text-red-600">{errors.professor.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Per Week *
              </label>
              <input
                {...register('hoursPerWeek', {
                  required: 'Hours per week is required',
                  min: { value: 1, message: 'At least 1 hour required' },
                  max: { value: 10, message: 'Maximum 10 hours allowed' },
                })}
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min="1"
                max="10"
              />
              {errors.hoursPerWeek && (
                <p className="mt-1 text-sm text-red-600">{errors.hoursPerWeek.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Days (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDays.includes(day)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Time Slots (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleTimeSlot(slot)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedTimeSlots.includes(slot)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            Add Subject
          </button>
        </form>
      </div>

      {subjects.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-xl mb-4 text-gray-800">
            Added Subjects ({subjects.length})
          </h3>
          <div className="space-y-3 mb-6">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-4 rounded-lg border-2 hover:shadow-md transition-all"
                style={{ borderColor: subject.color + '40', backgroundColor: subject.color + '10' }}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                  <p className="text-sm text-gray-600">
                    {subject.professor} • {subject.hoursPerWeek} hours/week
                  </p>
                  {subject.preferredDays && subject.preferredDays.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Preferred: {subject.preferredDays.join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onRemoveSubject(subject.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onGenerateTimetable}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl text-lg"
          >
            🎯 Generate Timetable
          </button>
        </div>
      )}
    </div>
  );
}
