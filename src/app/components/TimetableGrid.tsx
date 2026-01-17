import { TimeSlot, DAYS, TIME_SLOTS } from '@/app/types/timetable';
import { FileDown, RefreshCw, Download } from 'lucide-react';
import { exportToPDF, exportToExcel } from '@/app/utils/exportUtils';

interface TimetableGridProps {
  schedule: TimeSlot[];
  onRegenerate: () => void;
}

export function TimetableGrid({ schedule, onRegenerate }: TimetableGridProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl text-gray-800">📅 Your Timetable</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportToPDF(schedule)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => exportToExcel(schedule)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider w-32">
                    Time
                  </th>
                  {DAYS.map(day => (
                    <th
                      key={day}
                      className="px-4 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {TIME_SLOTS.map((time, timeIndex) => (
                  <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {time}
                    </td>
                    {DAYS.map(day => {
                      const slot = schedule.find(s => s.day === day && s.time === time);
                      const subject = slot?.subject;

                      return (
                        <td
                          key={`${day}-${time}`}
                          className="px-4 py-4 text-center"
                        >
                          {subject ? (
                            <div
                              className="rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                              style={{
                                backgroundColor: subject.color + '20',
                                borderLeft: `4px solid ${subject.color}`,
                              }}
                            >
                              <div className="font-semibold text-gray-900 text-sm">
                                {subject.name}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {subject.professor}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
        <div className="flex flex-wrap gap-4">
          {Array.from(
            new Map(
              schedule
                .filter(s => s.subject)
                .map(s => [s.subject!.id, s.subject!])
            ).values()
          ).map(subject => (
            <div key={subject.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: subject.color }}
              />
              <span className="text-sm text-gray-700">{subject.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
