import React, { useState } from "react";
import students from "./data/dummyData";
import { generateSchedule } from "./utils/scheduling";
import CalendarGrid from "./components/CalendarGrid";
import Overview from "./components/Overview";
import ExportButton from "./components/ExportButton";

function App() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [schedule, setSchedule] = useState({});

  const handleSchedule = () => {
    const sched = generateSchedule(students, selectedDates);
    setSchedule(sched);
  };

  const resetSchedule = () => {
    setSchedule({});
    setSelectedDates([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center sticky top-0 bg-gray-50 z-10 shadow p-4">
        📅 Meeting Scheduler
      </h1>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Select Dates</h2>
        <CalendarGrid selected={selectedDates} setSelected={setSelectedDates} />
      </section>

      <section className="mb-8 space-x-4">
        <button
          onClick={handleSchedule}
          disabled={!selectedDates.length}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded disabled:bg-gray-300"
        >
          Schedule Meetings
        </button>

        {Object.keys(schedule).length > 0 && (
          <button
            onClick={resetSchedule}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded"
          >
            Reset Schedule
          </button>
        )}
      </section>

      <Overview schedule={schedule} />

      <ExportButton schedule={schedule} />
    </div>
  );
}

export default App;
