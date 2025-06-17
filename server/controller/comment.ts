import express, { Response } from 'express';
import { Server } from 'socket.io';
import { Comment, AddCommentRequest } from '../types';
import { addComment, populateDocument } from '../models/application';

const commentController = (socket: Server) => {
  const router = express.Router();

  const isRequestValid = (req: AddCommentRequest): boolean =>
    !!req.body.id && !!req.body.type && !!req.body.comment;

  const isCommentValid = (comment: Comment): boolean =>
    !!comment.commentBy && !!comment.text && !!comment.commentDateTime;

  const addCommentRoute = async (req: AddCommentRequest, res: Response): Promise<void> => {
    if (!isRequestValid(req) || !isCommentValid(req.body.comment)) {
      res.status(400).send('Invalid request');
      return;
    }

    const { id, type, comment } = req.body;

    try {
      const result = await addComment(id, type, comment);

      if ('error' in result) {
        res.status(500).json({ success: false, error: result.error });
        return;
      }

      const populatedResult = await populateDocument(id, type);

      if (!populatedResult || 'error' in populatedResult) {
        res.status(500).json({ success: false, error: 'Error when saving a comment' });
        return;
      }

      res.status(200).json({
        _id: result.comments[result.comments.length - 1]._id,
        text: result.comments[result.comments.length - 1].text,
        commentBy: result.comments[result.comments.length - 1].commentBy,
        commentDateTime: result.comments[result.comments.length - 1].commentDateTime,
      });

      if ('comments' in populatedResult) {
        socket.emit('commentUpdate', {
          type,
          result: {
            _id: populatedResult._id,
            comments: populatedResult.comments,
          },
        });
      }
    } catch (error) {
      res.status(500).send(`Error when adding comment: ${(error as Error).message}`);
    }
  };

  router.post('/addComment', addCommentRoute);

  return router;
};

export default commentController;
