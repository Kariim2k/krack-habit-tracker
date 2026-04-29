"use client";

import { useState } from "react";
import { Habit } from "@/types/habit";
import { calculateCurrentStreak } from "@/lib/streaks";
import { getHabitSlug } from "@/lib/slug";

type HabitCardProps = {
  habit: Habit;
  onCompleteHabit: (id: string) => void;
  onEditHabit: (
    id: string,
    name: string,
    description: string
  ) => void;
  onDeleteHabit: (id: string) => void;
};

export default function HabitCard({
  habit,
  onCompleteHabit,
  onEditHabit,
  onDeleteHabit,
}: HabitCardProps) {
  const slug =
    getHabitSlug(habit.name);

  const streak =
    calculateCurrentStreak(
      habit.completions
    );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const completed =
    habit.completions.includes(
      today
    );

  const [editing, setEditing] =
    useState(false);

  const [
    confirmDelete,
    setConfirmDelete,
  ] = useState(false);

  const [name, setName] =
    useState(habit.name);

  const [
    description,
    setDescription,
  ] = useState(
    habit.description
  );

  function handleSave() {
    if (!name.trim()) return;

    onEditHabit(
      habit.id,
      name.trim(),
      description.trim()
    );

    setEditing(false);
  }

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className={`mb-4 rounded-2xl border p-4 shadow-md transition sm:p-5 ${
        completed
          ? "border-green-200 bg-green-100"
          : "border-gray-200 bg-white"
      }`}
    >
      {editing ? (
        <>
          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="mb-3 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />

          <input
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={
                handleSave
              }
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Save
            </button>

            <button
              onClick={() =>
                setEditing(
                  false
                )
              }
              className="rounded-xl bg-gray-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-600 active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold text-gray-900">
            {habit.name}
          </h3>

          {habit.description && (
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {
                habit.description
              }
            </p>
          )}

          <p
            data-testid={`habit-streak-${slug}`}
            className="mt-3 mb-4 text-sm font-bold text-orange-600"
          >
            🔥 {streak} day
            streak
          </p>

          <div className="grid gap-2 sm:grid-cols-3">
            <button
              data-testid={`habit-complete-${slug}`}
              onClick={() =>
                onCompleteHabit(
                  habit.id
                )
              }
              className="rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700 active:scale-[0.98]"
            >
              {completed
                ? "Unmark"
                : "Complete"}
            </button>

            <button
              data-testid={`habit-edit-${slug}`}
              onClick={() =>
                setEditing(
                  true
                )
              }
              className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 active:scale-[0.98]"
            >
              Edit
            </button>

            {!confirmDelete ? (
              <button
                data-testid={`habit-delete-${slug}`}
                onClick={() =>
                  setConfirmDelete(
                    true
                  )
                }
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
              >
                Delete
              </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    onDeleteHabit(
                      habit.id
                    )
                  }
                  className="rounded-xl bg-red-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-950 active:scale-[0.98]"
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    setConfirmDelete(
                      false
                    )
                  }
                  className="rounded-xl bg-gray-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-600 active:scale-[0.98]"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
