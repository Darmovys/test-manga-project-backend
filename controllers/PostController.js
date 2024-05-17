import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 3);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати статті',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: 'user', select: ['fullName', 'avatar'] })
      .exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати статті',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    // console.log('Це я', postId);
    // const post = await PostModel.findById(postId);
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
    ).populate('user');

    if (!post) {
      return res.status(404).json({
        message: 'Статті не знайдено',
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати статтю',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Статті не знайдено',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не вдалось видалити статтю',
    });
  }
};

export const create = async (req, res) => {
  try {
    console.log('Хех, ну привіт!');
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: 'Не вдалось створити статтю',
      });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
      res.json({
        success: true,
      }),
    );
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: 'Не вдалось оновити статтю',
      });
  }
};
