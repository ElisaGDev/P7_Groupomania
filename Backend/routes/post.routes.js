const router = require("express").Router();
const postController = require("../controllers/post.controller");
const { checkUser } = require("../middleware/auth.middleware");
const multer = require("../middleware/multer");

// Posts
router.get("/", checkUser, postController.getPosts);
router.post("/", checkUser, multer, postController.createPost);
router.put("/:id", checkUser, multer, postController.updatePost);
router.delete("/:id", checkUser, postController.deletePost);
router.patch("/like-post/:id", checkUser, postController.likePost);
router.patch("/unlike-post/:id", checkUser, postController.unLikePost);

// Commentaires
router.patch("/comment-post/:id", checkUser, postController.commentPost);
router.patch(
  "/edit-comment-post/:id",
  checkUser,
  postController.editCommentPost
);
router.patch(
  "/delete-comment-post/:id",
  checkUser,
  postController.deleteCommentPost
);

module.exports = router;
