import React from "react";
import { exportAttendanceData } from "../utils/exportToExcel";

export default function ExportButton({ schedule }) {
  return (
    <button
      onClick={() => exportAttendanceData(schedule)}
      className="bg-green-600 text-white my-3 px-4 py-2 rounded hover:bg-green-700"
    >
      Export to Excel
    </button>
  );
}
