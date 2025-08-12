import { Schema, model, models } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true }, // in hours
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    price: { type: Number, required: true }, // in USD
    category: { type: String, required: true }, // e.g., "Programming", "Design", "Marketing"
  },
  {
    timestamps: true,
  }
);

export default models.Course || model('Course', courseSchema);
