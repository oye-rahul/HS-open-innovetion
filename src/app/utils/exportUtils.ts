import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { TimeSlot, DAYS, TIME_SLOTS } from '@/app/types/timetable';

export function exportToPDF(schedule: TimeSlot[]) {
  const doc = new jsPDF('landscape');

  // Add title
  doc.setFontSize(18);
  doc.text('University Timetable', 14, 20);

  // Prepare data for table
  const tableData: string[][] = [];

  TIME_SLOTS.forEach(time => {
    const row: string[] = [time];
    DAYS.forEach(day => {
      const slot = schedule.find(s => s.day === day && s.time === time);
      if (slot && slot.subject) {
        row.push(`${slot.subject.name}\n(${slot.subject.professor})`);
      } else {
        row.push('');
      }
    });
    tableData.push(row);
  });

  autoTable(doc, {
    head: [['Time', ...DAYS]],
    body: tableData,
    startY: 30,
    theme: 'grid',
    headStyles: {
      fillColor: [59, 130, 246],
      fontSize: 10,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: 35 },
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 3,
    },
  });

  doc.save('timetable.pdf');
}

export function exportToExcel(schedule: TimeSlot[]) {
  // Prepare data for Excel
  const data: any[] = [];

  // Add header row
  const headerRow: any = { Time: 'Time' };
  DAYS.forEach(day => {
    headerRow[day] = day;
  });
  data.push(headerRow);

  // Add time slot rows
  TIME_SLOTS.forEach(time => {
    const row: any = { Time: time };
    DAYS.forEach(day => {
      const slot = schedule.find(s => s.day === day && s.time === time);
      if (slot && slot.subject) {
        row[day] = `${slot.subject.name} (${slot.subject.professor})`;
      } else {
        row[day] = '';
      }
    });
    data.push(row);
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });

  // Set column widths
  const wscols = [
    { wch: 20 }, // Time column
    ...DAYS.map(() => ({ wch: 25 })), // Day columns
  ];
  ws['!cols'] = wscols;

  // Create workbook and add worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Timetable');

  // Save file
  XLSX.writeFile(wb, 'timetable.xlsx');
}
