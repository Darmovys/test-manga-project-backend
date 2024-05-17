import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: 'basicAvatar/avatar.jpg',
    },
    about: {
      type: String,
      default: '',
    },
    reading: [
      {
        title: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
      },
    ],
    read: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
      default: [],
    },
    inPlans: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
      default: [],
    },
    abandoned: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
      default: [],
    },
    userComments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
    likedComments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
    dislikedComments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
      default: [],
    },
    likedBooks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
