const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log("user info req.params", req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    // console.log("docs", docs);
    if (!err) res.send(docs);
    else console.log("ID Unknown :" + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  // console.log("ObjectID", ObjectID);
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown :" + req.params.id);
  console.log("--- TEST EN COURS", req.body.bio);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((docs) => {
      res.status(200).send(docs);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  ) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    const followingUp = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { following: req.body.idToFollow },
      },
      { new: true, upsert: true }
    );

    const followerUp = await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(201).json("Update done.");
  } catch (err) {
    res.status(400).json("Something went wrong in the update " + err);
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).send("ID unknown :" + req.params.id);
  }

  try {
    const unfollowingUp = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { following: req.body.idToUnfollow },
      },
      { new: true, upsert: true }
    );

    const unfollowerUp = await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(201).json("Update done.");
  } catch (err) {
    res.status(400).json("Something went wrong in the update :" + err);
  }
};
