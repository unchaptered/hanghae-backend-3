const commentService = require('../services/comment.service');

const Comment = () => {
}

const updateCommentLike = (req, res, next) => {
    const {commentId} = req.params;
    const {isLike} = req.body;

    console.log(req.params, commentId, isLike);
};

module.exports = {
    Comment,
    updateCommentLike,
}