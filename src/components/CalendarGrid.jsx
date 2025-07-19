import React from "react";

export default function CalendarGrid({ selected, setSelected }) {
  const today = new Date();

  // Generate next 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  // Get day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-7 text-center font-semibold text-gray-700 mb-2">
        {dayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const isToday = day === new Date().toISOString().slice(0, 10);
          const isSelected = selected.includes(day);

          return (
            <div
              key={day}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day]
                )
              }
              className={`p-2 text-center rounded cursor-pointer transition-all duration-150 border 
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                } 
                ${isToday && !isSelected ? "border-blue-600" : ""}
              `}
            >
              <div className="text-sm">{new Date(day).getDate()}</div>
              <div className="text-xs text-gray-500">
                {new Date(day).toLocaleDateString(undefined, {
                  month: "short",
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
