const UserModel = require("../models/user.model");
const uploadErrors = require("../utils/errors.utils");
const fs = require("fs");

// Prévoir d'effacer l'ancienne image en cas de mise à jour du profil
module.exports.uploadProfil = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $set: { avatar: "./uploads/profil/" + req.file.filename } },
      { new: true }
    );
    res.status(200).json(req.file.path);
  } catch (err) {
    // const errors = uploadErrors(err);
    res.status(400).json(err);
  }
};
