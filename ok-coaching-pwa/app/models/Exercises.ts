import { Schema, model, models } from "mongoose";

const SetSchema = new Schema({
    tempo: {
        type: String,
    },
    rir: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    rest: {
        type: Number,
    },
});

const ExercisesSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        video: {
            type: String,
        },
        sets: [SetSchema],
    },
    {
        timestamps: true,
    }
);

const Exercises = models.Exercises || model("Exercises", ExercisesSchema);
export default Exercises;
