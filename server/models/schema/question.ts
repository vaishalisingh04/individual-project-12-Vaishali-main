import { Schema } from 'mongoose';

/**
 * Mongoose schema for the Question collection.
 *
 * This schema defines the structure for storing questions in the database.
 * Each question includes the following fields:
 * - `title`: The title of the question.
 * - `text`: The detailed content of the question.
 * - `tags`: An array of references to `Tag` documents associated with the question.
 * - `answers`: An array of references to `Answer` documents associated with the question.
 * - `askedBy`: The username of the user who asked the question.
 * - `askDateTime`: The date and time when the question was asked.
 * - `views`: The number of times the question has been viewed. Defaults to 0.
 * - `upVotes`: An array of usernames that have upvoted the question.
 * - `downVotes`: An array of usernames that have downvoted the question.
 * - `comments`: Comments that have been added to the question by users.
 */
const questionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true, // Ensure the title field is required
    },
    text: {
      type: String,
      required: true, // Ensure the text field is required
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }], // Reference to tags
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }], // Reference to answers
    askedBy: {
      type: String,
      required: true, // Ensure the askedBy field is required
    },
    askDateTime: {
      type: Date,
      required: true, // Ensure the askDateTime field is required
    },
    views: {
      type: Number,
      default: 0, // Default value for views
    },
    upVotes: [{ type: String }], // Array of usernames for upvotes
    downVotes: [{ type: String }], // Array of usernames for downvotes
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Reference to comments
  },
  { collection: 'Question' },
);

export default questionSchema;
