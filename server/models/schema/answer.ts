import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Answer collection.
 *
 * This schema defines the structure for storing answers in the database.
 * Each answer includes the following fields:
 * - `text`: The content of the answer.
 * - `ansBy`: The username of the user who provided the answer.
 * - `ansDateTime`: The date and time when the answer was given.
 * - `comments`: Comments that have been added to the answer by users.
 */
const answerSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true, // Ensure the text field is required
    },
    ansBy: {
      type: String,
      required: true, // Ensure the ansBy field is required
    },
    ansDateTime: {
      type: Date,
      required: true, // Ensure the ansDateTime field is required
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Reference to comments
  },
  { collection: 'Answer' },
);

export default answerSchema;
