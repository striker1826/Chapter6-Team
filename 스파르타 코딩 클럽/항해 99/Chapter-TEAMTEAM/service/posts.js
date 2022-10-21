const PostsRepository = require("../repository/posts");

class PostsService {
  postsRepository = new PostsRepository();
}

module.exports = PostsService;
