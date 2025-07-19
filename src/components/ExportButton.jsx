import React from "react";
import { exportSchedule } from "../utils/exportToExcel";
export default function ExportButton({ schedule }) {
  return (
    <button
      disabled={!Object.keys(schedule).length}
      onClick={() => exportSchedule(schedule)}
      className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded disabled:opacity-50"
    >
      Export to Excel
    </button>
  );
}
