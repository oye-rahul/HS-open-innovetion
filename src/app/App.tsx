import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { TimetableForm } from '@/app/components/TimetableForm';
import { TimetableGrid } from '@/app/components/TimetableGrid';
import { Subject, TimeSlot } from '@/app/types/timetable';
import { generateTimetable } from '@/app/utils/scheduler';
import { toast, Toaster } from 'sonner';

const STORAGE_KEY = 'university_timetable';

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [schedule, setSchedule] = useState<TimeSlot[]>([]);
  const [showTimetable, setShowTimetable] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSubjects(data.subjects || []);
        setSchedule(data.schedule || []);
        if (data.schedule && data.schedule.length > 0) {
          setShowTimetable(true);
        }
      } catch (error) {
        console.error('Failed to load saved timetable:', error);
      }
    }
  }, []);

  // Save to local storage whenever subjects or schedule change
  useEffect(() => {
    if (subjects.length > 0 || schedule.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ subjects, schedule })
      );
    }
  }, [subjects, schedule]);

  const handleAddSubject = (subject: Subject) => {
    setSubjects(prev => [...prev, subject]);
    toast.success(`Added ${subject.name} successfully!`);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    toast.info('Subject removed');
  };

  const handleGenerateTimetable = () => {
    if (subjects.length === 0) {
      toast.error('Please add at least one subject');
      return;
    }

    const newSchedule = generateTimetable(subjects);
    setSchedule(newSchedule);
    setShowTimetable(true);
    toast.success('🎉 Timetable generated successfully!');

    // Scroll to timetable
    setTimeout(() => {
      document.getElementById('timetable-grid')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleRegenerate = () => {
    handleGenerateTimetable();
    toast.success('Timetable regenerated!');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setSubjects([]);
      setSchedule([]);
      setShowTimetable(false);
      localStorage.removeItem(STORAGE_KEY);
      toast.info('All data cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900">
                  University Timetable Generator
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  AI-powered scheduling for perfect class organization
                </p>
              </div>
            </div>
            {subjects.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-red-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <TimetableForm
              subjects={subjects}
              onAddSubject={handleAddSubject}
              onRemoveSubject={handleRemoveSubject}
              onGenerateTimetable={handleGenerateTimetable}
            />
          </div>

          {/* Right Column - Timetable */}
          <div className="lg:col-span-2">
            {showTimetable && schedule.length > 0 ? (
              <div id="timetable-grid">
                <TimetableGrid
                  schedule={schedule}
                  onRegenerate={handleRegenerate}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-2xl text-gray-900 mb-3">
                    No Timetable Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Add subjects with their professors and preferences, then click "Generate
                    Timetable" to create your perfect schedule!
                  </p>
                  <div className="space-y-3 text-left bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      ✨ Features:
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Smart AI scheduling to avoid conflicts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Set preferred days and time slots</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Export to PDF or Excel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Auto-save with local storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Regenerate anytime for better results</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Footer */}
        {subjects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Total Subjects</div>
              <div className="text-3xl text-blue-600">{subjects.length}</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Total Hours/Week</div>
              <div className="text-3xl text-green-600">
                {subjects.reduce((sum, s) => sum + s.hoursPerWeek, 0)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Unique Professors</div>
              <div className="text-3xl text-purple-600">
                {new Set(subjects.map(s => s.professor)).size}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 pb-8 text-center text-sm text-gray-600">
        <p>
          Built with React, TypeScript, and Tailwind CSS • Smart Scheduling Algorithm
        </p>
      </div>
    </div>
  );
}
