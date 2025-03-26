import { Schema, model, models } from "mongoose";

const GroupsSchema = new Schema(
    {
        name: {
            type: String,
        },
        emoji: {
            type: String,
        },
        description: {
            type: String,
        },
        video: {
            type: String,
        },
        image: {
            type: String,
        },
        splits: [
            {
                type: Schema.Types.ObjectId,
                ref: "Splits",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Groups = models.Groups || model("Groups", GroupsSchema);
export default Groups;
