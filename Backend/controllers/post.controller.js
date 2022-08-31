const Post = require("../models/post.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.getPosts = (req, res, next) => {
  Post.find((err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      console.log("Erreur pour récupérer les posts!" + err);
    }
  }).sort({ createdAt: -1 });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

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
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.updatePost = (req, res, next) => {
  const userData = res.locals.user;
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      postData = post;
      if (postData.posterId == userData._id || userData.role === "admin") {
        if (req.body.picture) {
          const updatePostContent = {
            message: req.body.message,
            picture: req.body.picture,
          };
          Post.findByIdAndUpdate(
            req.params.id,
            { $set: updatePostContent },
            { new: true },
            (err, data) => {
              if (!err) res.status(200).send(data);
              else console.log("Mise à jour du post impossible! " + err);
            }
          );
        } else {
          const updatePostContent = { message: req.body.message };
          Post.findByIdAndUpdate(
            req.params.id,
            { $set: updatePostContent },
            { new: true },
            (err, data) => {
              if (!err) res.status(200).send(data);
              else console.log("Mise à jour du post impossible! " + err);
            }
          );
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  const userData = res.locals.user;
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      postData = post;
      if (postData.posterId == userData._id || userData.role === "admin") {
        fs.unlink(`../client/public/images/posts/${postData.picture}`, () => {
          Post.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) res.status(200).send(data);
            else console.log("Suppression du post impossible! " + err);
          });
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.likePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    await Post.findOne({ _id: req.params.id }).then((post) => {
      if (!post.likers.includes(req.body.posterId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $push: { likers: req.body.posterId },
          }
        )
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
      } else if (post.likers.includes(req.body.posterId)) {
        {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { likers: req.body.posterId },
            }
          )
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
        }
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.dislikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    await Post.findOne({ _id: req.params.id }).then((post) => {
      if (!post.likers.includes(req.body.posterId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $push: { likers: req.body.posterId },
          }
        )
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err }));
      } else if (post.likers.includes(req.body.posterId)) {
        {
          Post.updateOne(
            { _id: req.params.id },
            {
              $pull: { likers: req.body.posterId },
            }
          )
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
        }
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.commentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
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

exports.editCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
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

exports.deleteCommentPost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu: " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
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
