import * as XLSX from "xlsx";

export function exportSchedule(schedule) {
  const wb = XLSX.utils.book_new();
  const data = [];

  Object.entries(schedule).forEach(([date, meetings]) => {
    meetings.forEach((m) => {
      data.push({
        Date: formatDate(date),
        "Student Name": m.student_name,
        Class: m.class_name,
        Age: m.age,
        "Meeting Link": m.meeting_link,
        Attendance: m.status,
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);

  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell) {
        cell.s = {
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, "All Meetings");
  XLSX.writeFile(wb, "meeting_schedule.xlsx");
}

function formatDate(dateStr) {
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
}
