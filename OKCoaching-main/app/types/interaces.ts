interface Group {
    _id: string;
    name: string;
    emoji: string;
    description: string;
    image: string;
    video: string;
    splits: string[]; // Array of split IDs
}

interface Exercise {
    _id: string;
    name: string;
    description: string;
    video: string;
    sets: Set[]; // Array of sets
}

interface Set {
    tempo: string; // Should follow the format "1.2.3.4"
    rir: number | null; // Repetitions in reserve
    reps: number | null; // Number of repetitions
    rest: number | null; // Rest time in seconds
}

interface Split {
    _id: string;
    name: string;
    releaseSince: Date; // Date when the split is released
    days: Day[]; // Array of training days
    groupId: string; // Reference to the associated group
}

interface Day {
    _id: string; // Unique identifier for the day
    dayNumber: number; // Day number in the training plan
    trainingName: string; // Name of the training (e.g., "Upper", "Lower")
    isRestDay: boolean; // Indicates if the day is a rest day
    exercises: SplitExercise[]; // Exercises for the day
}

interface SplitExercise {
    exercise: string; // Reference to an Exercise ID
    description: string; // Custom description for the exercise in this split
    customSets: Set[]; // Custom sets for the exercise in this split
}

export type { Group, Exercise, Set, Split, Day, SplitExercise };
