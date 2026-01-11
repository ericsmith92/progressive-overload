export interface CreateUserBody {
  displayName: string;
  email?: string;
}

export interface CreateExerciseBody {
  name: string;
}

export interface CreateExerciseLogBody {
  userId: string;
  exerciseId: string;
  weight: number;
}
