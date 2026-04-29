import { Habit } from "@/types/habit";
import { User, Session } from "@/types/auth";

const USERS_KEY = "habit-tracker-users";
const SESSION_KEY = "habit-tracker-session";
const HABITS_KEY = "habit-tracker-habits";

/* Habits */
export function getStoredHabits(): Habit[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredHabits(
  habits: Habit[]
): void {
  localStorage.setItem(
    HABITS_KEY,
    JSON.stringify(habits)
  );
}

/* Users */
export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredUsers(
  users: User[]
): void {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

/* Session */
export function getStoredSession(): Session | null {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveStoredSession(
  session: Session
): void {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );
}

export function clearStoredSession(): void {
  localStorage.removeItem(SESSION_KEY);
}