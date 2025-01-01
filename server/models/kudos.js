import mongoose from "mongoose";

const { Schema } = mongoose;

const KudoSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  kudoMessage: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [String],
    default: [],
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default new mongoose.model("Kudo", KudoSchema);
