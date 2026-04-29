import { User, Session } from "@/types/auth";
import {
  getStoredUsers,
  saveStoredUsers,
  getStoredSession,
  saveStoredSession,
  clearStoredSession,
} from "./storage";

export function getCurrentSession(): Session | null {
  return getStoredSession();
}

export function signupUser(
  email: string,
  password: string
): {
  success: boolean;
  error: string | null;
} {
  const users = getStoredUsers();

  const exists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  saveStoredUsers([...users, newUser]);

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  };

  saveStoredSession(session);

  return {
    success: true,
    error: null,
  };
}

export function loginUser(
  email: string,
  password: string
): {
  success: boolean;
  error: string | null;
} {
  const users = getStoredUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
        email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  saveStoredSession({
    userId: user.id,
    email: user.email,
  });

  return {
    success: true,
    error: null,
  };
}

export function logoutUser(): void {
  clearStoredSession();
}