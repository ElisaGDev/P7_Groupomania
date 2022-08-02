const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

//Posts
router.get("/", postController.getPosts);
router.get("/:id", postController.getOnePost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//Like Post
router.patch("/:id/likes", postController.likePost);
router.patch("/:id/dislikes", postController.dislikePost);

//Comment Post
router.patch("/:id/comment-post", postController.commentPost);
router.patch("/:id/edit-comment-post", postController.editCommentPost);
router.patch("/:id/delete-comment-post", postController.deleteCommentPost);

module.exports = router;
