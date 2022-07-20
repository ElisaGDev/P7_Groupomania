const Post = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require("jsonwebtoken");

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
    posterPseudo: req.body.posterPseudo,
    message: req.body.message,
    picture: req.body.picture,
    usersLiked: [],
    usersDisliked: [],
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
  if (!ObjectID.isValid(req.params.id))
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
  if (!ObjectID.isValid(req.params.id))
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
