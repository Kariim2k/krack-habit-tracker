export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  const currentDate =
    today ||
    new Date()
      .toISOString()
      .split("T")[0];

  const uniqueDates = Array.from(
    new Set(completions)
  ).sort();

  if (
    !uniqueDates.includes(
      currentDate
    )
  ) {
    return 0;
  }

  let streak = 1;

  let cursor = new Date(
    currentDate
  );

  while (true) {
    cursor.setDate(
      cursor.getDate() - 1
    );

    const previous =
      cursor
        .toISOString()
        .split("T")[0];

    if (
      uniqueDates.includes(
        previous
      )
    ) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}