import { Schema, model, models } from "mongoose";

const PromoSchema = new Schema(
    {
        code: {
            type: String,
        },
        expiration: {
            type: Date,
        },
        percent: {
            type: Number,
        },
        months: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Promo = models.Promo || model("Promo", PromoSchema);
export default Promo;
