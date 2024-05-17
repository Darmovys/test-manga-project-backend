import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String },
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: true,
    },
    titles: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Team', TeamSchema);
