import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const CommentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: ['username', 'avatarURL', '_id'] },
      required: true,
    },
    madeIn: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'commentPlace',
    },
    commentPlace: {
      type: String,
      required: true,
      enum: ['Book', 'Chapters'],
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
          autopopulate: { select: ['-madeIn'] },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);
CommentSchema.plugin(autopopulate);
export default mongoose.model('Comment', CommentSchema);
