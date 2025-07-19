export function generateSchedule(students, selectedDates) {
  const sorted = [...students].sort((a, b) => b.age - a.age);
  const schedule = {};
  selectedDates.forEach((date) => (schedule[date] = []));
  const classes = [...new Set(sorted.map((s) => s.class_name))];
  const classQueues = classes.reduce(
    (q, c) => ({ ...q, [c]: sorted.filter((s) => s.class_name === c) }),
    {}
  );
  let dateIndex = 0;

  sorted.forEach((student) => {
    for (let i = 0; i < student.meetings; i++) {
      const dates = selectedDates;
      const date = dates[dateIndex % dates.length];
      schedule[date].push({
        ...student,
        meeting_link: `https://meet.example.com/${encodeURIComponent(
          student.student_name.replace(/\s/g, "")
        )}`,
        status: ["Present", "Absent", "Late"][Math.floor(Math.random() * 3)],
      });
      dateIndex++;
    }
  });
  return schedule;
}
