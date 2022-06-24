const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const upload = require("../middleware/multer.middleware");

module.exports.readPost = async (req, res) => {
  // PostModel.find((err, docs) => {
  //   if (!err) res.send(docs);
  //   else console.log("Get data error :" + err);
  // }).sort({ createdAt: -1 });

  try {
    await PostModel.find()
      // .sort({ createdAt: -1 })
      .then((docs) => res.status(200).send(docs));
  } catch (err) {
    console.log(err);
  }
};

module.exports.createPost = async (req, res) => {
  const { posterId, message, video } = req.body;

  console.log(req.body);

  console.log(req.file);

  // if (req.file !== null) {
  //   const picture = upload(req.file);
  // }

  const newPost = new PostModel({
    posterId,
    message,
    // picture: picture ? picture.path : "",
    video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.paramas.id);

  const updatedPost = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedPost },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  try {
    const likerUpdate = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { liker: req.body.id },
      },
      { new: true }
    );

    const likesUpdate = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    );

    return res.status(200).json(likesUpdate);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { liker: req.body.id },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    ).then((data) => res.send(data));

    // return res.status(200).json(likesUpdate);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  const { commenterId, commenterPseudo, text } = req.body;

  try {
    const newComment = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          commenterId,
          commenterPseudo,
          text,
          timestamp: new Date().getTime(),
        },
      },
      { new: true }
    );

    return res.status(200).json(newComment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  try {
    const editedComment = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      { new: true }
    );
    return res.status(200).json(editedComment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknown :" + req.params.id);

  try {
    const deletedComment = await PostModel.findByIdAndDelete(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json(deletedComment);
  } catch (err) {
    return res.status(400).send(err);
  }
};
