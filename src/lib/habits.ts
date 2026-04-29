import { Habit } from "@/types/habit";

export function toggleHabitCompletion(
  habit: Habit,
  date: string
): Habit {
  const completions = new Set(
    habit.completions
  );

  if (completions.has(date)) {
    completions.delete(date);
  } else {
    completions.add(date);
  }

  return {
    ...habit,
    completions: Array.from(
      completions
    ),
  };
}

export function createHabit(
  name: string,
  userId: string,
  description = ""
): Habit {
  return {
    id: crypto.randomUUID(),
    userId,
    name: name.trim(),
    description:
      description.trim(),
    frequency: "daily",
    createdAt:
      new Date().toISOString(),
    completions: [],
  };
}

export function updateHabit(
  habit: Habit,
  name: string,
  description: string
): Habit {
  return {
    ...habit,
    name: name.trim(),
    description:
      description.trim(),
  };
}