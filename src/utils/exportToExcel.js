import * as XLSX from "xlsx-js-style";

export function exportAttendanceData(schedule) {
  const workbook = XLSX.utils.book_new();

  const borderStyle = {
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  };

  const headerStyle = {
    ...borderStyle,
    font: { bold: true },
  };

  Object.entries(schedule).forEach(([date, meetings]) => {
    const formattedDate = formatDate(date);

    const worksheetData = [
      [
        { v: "Date", s: headerStyle },
        { v: "Student Name", s: headerStyle },
        { v: "Class", s: headerStyle },
        { v: "Age", s: headerStyle },
        { v: "Meeting Link", s: headerStyle },
        { v: "Attendance", s: headerStyle },
      ],
      ...meetings.map((m) => [
        { v: formattedDate, s: borderStyle },
        { v: m.student_name, s: borderStyle },
        { v: m.class_name, s: borderStyle },
        { v: m.age, s: borderStyle },
        {
          v: m.meeting_link,
          l: { Target: m.meeting_link },
          s: {
            ...borderStyle,
            font: { color: { rgb: "0000EE" }, underline: true },
          },
        },
        { v: m.status, s: borderStyle },
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, ws, formattedDate);
  });

  XLSX.writeFile(workbook, "MeetingScheduler.xlsx");
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}
