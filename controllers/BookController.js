import BookModel from '../models/Book.js';
import ChapterModel from '../models/Chapter.js';

export const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({ _id: bookId })
      .populate({ path: 'chapters', select: ['_id', 'title'] })
      .exec();

    res.json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати книгу',
    });
  }
};

export const getChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const chapter = await ChapterModel.findOne({ _id: chapterId })
      .populate({
        path: 'father',
        select: ['_id', 'title', 'titleUa', 'chapters'],
        populate: { path: 'chapters', select: ['_id', 'title', 'imageURL'] },
      })
      .populate({
        path: 'comments',
        select: ['-madeIn'],
        populate: { path: 'user', select: ['_id', 'username', 'avatarURL'] },
      })
      .exec();

    res.json(chapter);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати розділ',
    });
  }
};
