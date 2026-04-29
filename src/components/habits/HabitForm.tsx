"use client";

import { useState } from "react";
import { Habit } from "@/types/habit";

type HabitFormProps = {
  onAddHabit: (
    name: string,
    description: string,
    frequency:
      | "daily"
      | "weekly"
      | "bi-weekly"
      | "monthly"
  ) => void;
  habits: Habit[];
};

export default function HabitForm({
  onAddHabit,
  habits,
}: HabitFormProps) {
  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [frequency, setFrequency] =
    useState<
      | "daily"
      | "weekly"
      | "bi-weekly"
      | "monthly"
    >("daily");

  const [error, setError] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const trimmed =
      name.trim();

    if (!trimmed) {
      setError(
        "Habit name is required"
      );
      return;
    }

    if (trimmed.length > 60) {
      setError(
        "Habit name must be 60 characters or fewer"
      );
      return;
    }

    const exists = habits.some(
      (habit) =>
        habit.name
          .trim()
          .toLowerCase() ===
        trimmed.toLowerCase()
    );

    if (exists) {
      setError(
        "Habit already exists."
      );
      return;
    }

    setError("");

    onAddHabit(
      trimmed,
      description.trim(),
      frequency
    );

    setName("");
    setDescription("");
    setFrequency("daily");
  }

  return (
    <form
      data-testid="habit-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-purple-200 p-4 sm:p-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-gray-900"
        >
          Habit Name
        </label>

        <input
          id="name"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="e.g. Drink Water"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-semibold text-gray-900"
        >
          Description
        </label>

        <input
          id="description"
          data-testid="habit-description-input"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Optional details"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          htmlFor="frequency"
          className="mb-1 block text-sm font-semibold text-gray-900"
        >
          Frequency
        </label>

        <select
          id="frequency"
          data-testid="habit-frequency-select"
          value={frequency}
          onChange={(e) =>
            setFrequency(
              e.target.value as
                | "daily"
                | "weekly"
                | "bi-weekly"
                | "monthly"
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        >
          <option value="daily">
            Daily
          </option>

          <option value="weekly">
            Weekly
          </option>

          <option value="bi-weekly">
            Bi Weekly
          </option>

          <option value="monthly">
            Monthly
          </option>
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        data-testid="habit-save-button"
        className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 active:scale-[0.98]"
      >
        Save Habit
      </button>
    </form>
  );
}