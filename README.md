Habit Tracker PWA

Project Overview

Habit Tracker PWA is an offline-first habit tracking application built with *Next.js*, *React*, and *TypeScript*.

The app allows users to create accounts, log in, manage habits, track streaks, and use the application even without an internet connection.


Core Features

- User signup and login
- Persistent session handling
- Create habits
- Edit habits
- Delete habits with confirmation
- Mark habits complete/incomplete
- Daily streak tracking
- Offline storage using localStorage
- Progressive Web App (PWA) install support
- Responsive mobile-friendly UI

---

Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- localStorage
- Vitest
- React Testing Library
- Playwright
- PWA Manifest + Service Worker

---

#Setup Instructions

Clone the Repository

`bash
git clone <your-repository-url>
cd habit-tracker

2. Install Dependencies

- npm install

Run Instructions
Start Development Server

- npm run dev

Open:

http://localhost:3000
Run Production Build
npm run build
npm start
Test Instructions
Run Unit + Integration Tests
npm test
Run End-to-End Tests
npx playwright test
Local Persistence Structure

The application stores all data in browser localStorage so it works offline.

Storage Keys
habit-tracker-users
habit-tracker-session
habit-tracker-habits

Users Structure
[
  {
    "id": "user-1",
    "email": "user@email.com",
    "password": "123456"
  }
]
Session Structure
{
  "userId": "user-1",
  "email": "user@email.com"
}
Habits Structure
[
  {
    "id": "habit-1",
    "userId": "user-1",
    "name": "Drink Water",
    "description": "8 glasses daily",
    "frequency": "daily",
    "createdAt": "2026-04-29",
    "completions": ["2026-04-29"]
  }
]
PWA Support Implementation

The project includes Progressive Web App support for installability and offline usage.

Manifest File

Location:

public/manifest.json

Contains:

App name
Short name
Theme color
Background color
Start URL
Display mode (standalone)
Icons


Icons

Location:

public/icons/

Recommended files:

icon-192.png
icon-512.png


Service Worker

Location:

public/sw.js

Used for:

Caching static assets
Offline loading
Faster repeat visits


Metadata Registration

Configured inside:

src/app/layout.tsx

Includes:

Manifest link
Theme color
Icons
Trade-offs / Limitations


Browser Storage Only

All data is saved locally.

Advantage
Fast
Offline ready
No backend required
Limitation
Data is lost if browser storage is cleared
No sync between devices


No Backend Authentication

Authentication is simulated locally.

Limitation
Not production secure
Passwords are not server protected


Simple PWA Cache Strategy

Basic caching is implemented.

Limitation
No advanced cache versioning
No push notifications


Single Device Experience

Each browser acts as its own separate account store.

Required Test File Mapping
Unit Tests
tests/unit/slug.test.ts


Verifies:

habit names convert to lowercase
spaces become hyphens
clean slug output
tests/unit/streaks.test.ts


Verifies:

streak count logic
consecutive completion tracking
streak reset when dates are missed
tests/unit/habits.test.ts


Verifies:

create habit logic
toggle completion logic
edit behavior
delete behavior
tests/unit/auth.test.ts


Verifies:

signup validation
login validation
duplicate account prevention
Integration Tests
tests/integration/auth-flow.test.tsx


Verifies:

signup flow
login flow
redirects after authentication
logout behavior
tests/integration/habit-form.test.tsx


Verifies:

habit creation
duplicate prevention
validation messages
habit rendering in dashboard
End-to-End Tests
tests/e2e/app.spec.ts


Verifies complete user journey:

visit app
create account
login
add habit
mark complete
edit habit
delete habit
logout


Project Structure

src/
	app/
		globals.css
		layout.tsx
		page.tsx
		login/
			page.tsx
		signup/
			page.tsx
		dashboard/
			page.tsx
	components/
		auth/
			LoginForm.tsx
			SignupForm.tsx
		habits/
			HabitForm.tsx
			HabitList.tsx
			HabitCard.tsx
		shared/
			SplashScreen.tsx
			ProtectedRoute.tsx
	lib/
		auth.ts
		habits.ts
		storage.ts
		streaks.ts
		slug.ts
		validators.ts
		constants.ts
	types/
		auth.ts
		habit.ts
public/
	icons/
		icon-192.png
		icon-512.png
	manifest.json
	sw.js
tests/
	unit/
		slug.test.ts
		validators.test.ts
		streaks.test.ts
		habits.test.ts
	integration/
		auth-flow.test.tsx
		habit-form.test.tsx
	e2e/
		app.spec.ts


Final Notes

This project was designed to meet the assessment requirements while remaining simple, clean, offline-capable, and easy to maintain.

=======
# krack-habit-tracker
>>>>>>> cc5feea4a73eb771fe6df1b8bbdd14440dbb8b0b
