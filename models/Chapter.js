import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pages: { type: [String], required: true },
    father: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    volume: { type: Number, required: true },
    chapter: { type: Number, required: true },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Chapter', ChapterSchema);
