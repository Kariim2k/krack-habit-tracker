import { describe, it, expect } from "vitest";
import { toggleHabitCompletion } from "@/lib/habits";

const habit = {
  id: "1",
  userId: "1",
  name: "Drink Water",
  description: "",
  frequency: "daily" as const,
  createdAt: "2026-01-01",
  completions: [],
};

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const result = toggleHabitCompletion(habit, "2026-01-10");
    expect(result.completions).toContain("2026-01-10");
  });

  it("removes a completion date when the date already exists", () => {
    const updated = {
      ...habit,
      completions: ["2026-01-10"],
    };

    const result = toggleHabitCompletion(updated, "2026-01-10");
    expect(result.completions).toEqual([]);
  });

  it("does not mutate the original habit object", () => {
    toggleHabitCompletion(habit, "2026-01-10");
    expect(habit.completions).toEqual([]);
  });

  it("does not return duplicate completion dates", () => {
    const updated = {
      ...habit,
      completions: ["2026-01-10"],
    };

    const result = toggleHabitCompletion(updated, "2026-01-11");
    expect(new Set(result.completions).size).toBe(result.completions.length);
  });
});