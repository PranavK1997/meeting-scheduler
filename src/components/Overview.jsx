import React from "react";

export default function Overview({ schedule }) {
  if (!Object.keys(schedule).length) return null;

  const classSummary = {};
  let totalMeetings = 0;
  let completedMeetings = 0;

  Object.values(schedule).forEach((meetings) => {
    meetings.forEach((m) => {
      totalMeetings++;
      if (m.status === "Completed") completedMeetings++;

      if (!classSummary[m.class_name]) {
        classSummary[m.class_name] = { count: 0, completed: 0 };
      }
      classSummary[m.class_name].count++;
      if (m.status === "Completed") classSummary[m.class_name].completed++;
    });
  });

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="space-y-6">
      {Object.entries(schedule).map(([date, meetings]) => (
        <div key={date} className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold">{formatDate(date)}</h3>
          <table className="min-w-full my-2 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1">Student</th>
                <th className="px-2 py-1">Class</th>
                <th className="px-2 py-1">Age</th>
                <th className="px-2 py-1">Link</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-2 py-1">{m.student_name}</td>
                  <td className="px-2 py-1">{m.class_name}</td>
                  <td className="px-2 py-1">{m.age}</td>
                  <td className="px-2 py-1 text-blue-600 break-all">
                    {m.meeting_link}
                  </td>
                  <td className="px-2 py-1">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-bold mb-3">📊 Class-wise Summary</h3>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-left">Class</th>
              <th className="px-2 py-1 text-left">Total Meetings</th>
              <th className="px-2 py-1 text-left">Completed</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(classSummary).map(([className, stats], i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-2 py-1">{className}</td>
                <td className="px-2 py-1">{stats.count}</td>
                <td className="px-2 py-1">{stats.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-gray-700">
          ✅ <strong>{completedMeetings}</strong> of{" "}
          <strong>{totalMeetings}</strong> meetings completed (
          {((completedMeetings / totalMeetings) * 100).toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}
