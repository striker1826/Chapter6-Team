const PostsService = require("../service/posts");

class PostsController {
  postsService = new PostsService();
}

module.exports = PostsController;
