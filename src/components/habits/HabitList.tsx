import { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";

type HabitListProps = {
  habits: Habit[];
  onCompleteHabit: (id: string) => void;
  onEditHabit: (
    id: string,
    name: string,
    description: string
  ) => void;
  onDeleteHabit: (id: string) => void;
};

export default function HabitList({
  habits,
  onCompleteHabit,
  onEditHabit,
  onDeleteHabit,
}: HabitListProps) {
  return (
    <div className="my-6 flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onCompleteHabit={
            onCompleteHabit
          }
          onEditHabit={
            onEditHabit
          }
          onDeleteHabit={
            onDeleteHabit
          }
        />
      ))}
    </div>
  );
}