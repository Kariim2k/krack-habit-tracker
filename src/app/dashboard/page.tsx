"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import { Habit } from "@/types/habit";
import {
  createHabit,
  toggleHabitCompletion,
} from "@/lib/habits";
import {
  getStoredHabits,
  saveStoredHabits,
  getStoredSession,
  clearStoredSession,
} from "@/lib/storage";

export default function DashboardPage() {
  const router = useRouter();

  const [habits, setHabits] =
    useState<Habit[]>([]);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const session =
      getStoredSession();

    if (!session) return;

    const allHabits =
      getStoredHabits();

    const userHabits =
      allHabits.filter(
        (habit) =>
          habit.userId ===
          session.userId
      );

    setHabits(userHabits);
  }, []);

  function saveUserHabits(
    updatedUserHabits: Habit[]
  ) {
    const session =
      getStoredSession();

    if (!session) return;

    const allHabits =
      getStoredHabits();

    const otherUsersHabits =
      allHabits.filter(
        (habit) =>
          habit.userId !==
          session.userId
      );

    const finalHabits = [
      ...otherUsersHabits,
      ...updatedUserHabits,
    ];

    setHabits(updatedUserHabits);
    saveStoredHabits(finalHabits);
  }

  function addHabit(
    name: string,
    description: string
  ) {
    setError("");

    const session =
      getStoredSession();

    if (!session) return;

    const normalizedName = name
      .trim()
      .toLowerCase();

    const alreadyExists =
      habits.some(
        (habit) =>
          habit.name
            .trim()
            .toLowerCase() ===
          normalizedName
      );

    if (alreadyExists) {
      setError(
        "Habit already exists."
      );
      return;
    }

    const newHabit = {
      ...createHabit(
        name,
        session.userId
      ),
      description,
    };

    saveUserHabits([
      ...habits,
      newHabit,
    ]);
  }

  function completeHabit(
    id: string
  ) {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const updatedHabits =
      habits.map((habit) =>
        habit.id === id
          ? toggleHabitCompletion(
              habit,
              today
            )
          : habit
      );

    saveUserHabits(
      updatedHabits
    );
  }

  function editHabit(
    id: string,
    name: string,
    description: string
  ) {
    const updatedHabits =
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              name,
              description,
            }
          : habit
      );

    saveUserHabits(
      updatedHabits
    );
  }

  function deleteHabit(
    id: string
  ) {
    const updatedHabits =
      habits.filter(
        (habit) =>
          habit.id !== id
      );

    saveUserHabits(
      updatedHabits
    );
  }

  function handleLogout() {
    clearStoredSession();
    router.push("/login");
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-transparent p-3 sm:p-5">
        <section
          data-testid="dashboard-page"
          className="mx-auto w-full max-w-3xl rounded-2xl bg-[#D9E1F1] p-4 shadow-xl sm:p-6"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Habit Tracker
              </h1>

              <p className="mt-1 text-sm text-gray-700">
                Build consistency one day at a time
              </p>
            </div>

            <button
              data-testid="auth-logout-button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 active:scale-[0.98] sm:px-4 sm:py-2 sm:text-sm"
            >
              Logout
            </button>
          </div>

          <div className="mb-5">
            <HabitForm
              onAddHabit={addHabit}
              habits={habits}
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}

          {habits.length === 0 ? (
            <div
              data-testid="empty-state"
              className="rounded-2xl border-2 border-dashed border-gray-400 px-4 py-8 text-center"
            >
              <p className="text-base text-gray-900">
                No habits yet.
              </p>

              <p className="mt-2 text-sm text-gray-700">
                Add your first habit above.
              </p>
            </div>
          ) : (
            <HabitList
              habits={habits}
              onCompleteHabit={completeHabit}
              onEditHabit={editHabit}
              onDeleteHabit={deleteHabit}
            />
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
