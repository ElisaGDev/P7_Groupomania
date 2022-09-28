const Post = require("../models/post.model");
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Consultation de tous les posts
exports.getPosts = (req, res, next) => {
  Post.find((error, docs) => {
    if (!error) {
      res.send(docs);
    } else {
      console.log("Error to get data :" + error);
    }
  }).sort({ createdAt: -1 }); // tri du plus récent au plus ancien post
};

// Consultation d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Création d'un post
exports.createPost = async (req, res, next) => {
  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    picture:
      req.file !== undefined
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Mis à jour d'un post
exports.updatePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    const updatedRecord = {};
    if (req.body.message && req.body.message !== "null") {
      updatedRecord.message = req.body.message;
    }
    if (req.file) {
      updatedRecord.picture = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (error, data) => {
        if (!error) {
          res.send(data);
        } else {
          console.log("Update error : " + error);
        }
      }
    );
  }
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    Post.findOne({ _id: req.params.id }).then((post) => {
      if (!post) {
        res.status(404).json({ error: new Error("Post non trouvé !") });
      }
      const filename = post.picture.split("/uploads/")[1];

      fs.unlink(`./uploads/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    });
  }
};

// Like d'un post
exports.likePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    try {
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true }
      );
      return res.status(200).send("OK");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
};

// Unlike d'un post
exports.unLikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json("ID Unknown : " + req.params.id);
  } else {
    try {
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likers: req.body.id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true }
      );
      return res.status(200).send("OK");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

// Commenter un post
exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Mis à jour d'un commentaire
exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Commentaire non trouvé!");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Suppression d'un commentaire
exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};
