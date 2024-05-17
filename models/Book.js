import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    titleEn: { type: String, required: true },
    titleUa: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    backgroundUrl: { type: String, default: '' },
    about: { type: String, default: '' },
    releaseDate: { type: Number, required: true },
    genres: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    status: { type: String, required: true },
    translationStatus: { type: String, required: true },
    uploadedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    chapters: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Chapter',
        },
      ],
      default: [],
    },
    readingBy: { type: Number, default: 0 },
    readBy: { type: Number, default: 0 },
    inPlansBy: { type: Number, default: 0 },
    abandonedBy: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Book', BookSchema);
