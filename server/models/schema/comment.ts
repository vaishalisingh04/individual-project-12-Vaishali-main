import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Comment collection.
 *
 * This schema defines the structure of comment used in questions and answers in the database.
 * Each comment includes the following fields:
 * - `text`: The content of the comment.
 * - `commentBy`: The username of the user who commented.
 * - `commentDateTime`: The date and time when the comment was posted.
 */
const commentSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true, // Ensure the text field is required
    },
    commentBy: {
      type: String,
      required: true, // Ensure the commentBy field is required
    },
    commentDateTime: {
      type: Date,
      required: true, // Ensure the commentDateTime field is required
    },
  },
  { collection: 'Comment' },
);

export default commentSchema;
