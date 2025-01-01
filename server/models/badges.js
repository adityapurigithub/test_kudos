import mongoose from "mongoose";

const { Schema } = mongoose;

const BadgeSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export default new mongoose.model("Badge", BadgeSchema);
