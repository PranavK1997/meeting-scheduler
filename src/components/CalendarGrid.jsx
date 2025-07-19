import React from "react";
export default function CalendarGrid({ selected, setSelected }) {
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  return (
    <div className="grid grid-cols-7 gap-4 mb-4">
      {days.map((day) => (
        <div
          key={day}
          onClick={() => {
            setSelected((prev) =>
              prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
            );
          }}
          className={`p-4 text-center border rounded cursor-pointer ${
            selected.includes(day)
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          {new Date(day).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </div>
      ))}
    </div>
  );
}
