import { Schema, model, models } from "mongoose";

const CustomSetSchema = new Schema({
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

const SplitExerciseSchema = new Schema({
    exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercises",
        required: true,
    },
    customSets: [CustomSetSchema],
    description: {
        type: String,
        default: "",
    },
});

const SplitsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        releaseSince: {
            type: Date,
            required: true,
        },
        days: [
            {
                dayNumber: {
                    type: Number,
                    required: true,
                },
                trainingName: {
                    type: String,
                    required: true,
                },
                isRestDay: {
                    type: Boolean,
                    default: false,
                },
                exercises: [SplitExerciseSchema],
            },
        ],
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "Groups",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Splits = models.Splits || model("Splits", SplitsSchema);
export default Splits;
