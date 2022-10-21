const CommentsService = require("../service/comments");

class CommentsController {
  commentsService = new CommentsService();
}

module.exports = CommentsController;
