import React from 'react';
import { handleHyperlink } from '../../../../tool';
import CommentSection from '../../commentSection';
import './index.css';
import { Comment } from '../../../../types';

/**
 * Interface representing the props for the Answer component.
 *
 * - text - The content of the answer
 * - ansBy - The username of the user who wrote the answer
 * - meta - Additional metadata related to the answer
 * - comments - List of comments associated with the answer
 * - handleAddComment - Function to handle adding a new comment
 */
interface AnswerProps {
  text: string;
  ansBy: string;
  meta: string;
  comments: Comment[]; // Added field for comments
  handleAddComment: (comment: Comment) => void; // Added field for handling new comments
}

/**
 * Answer component that displays the content of an answer with the author's name and metadata.
 * The content is processed to handle hyperlinks.
 *
 * @param text The content of the answer.
 * @param ansBy The username of the answer's author.
 * @param meta Additional metadata related to the answer.
 * @param comments List of comments associated with the answer.
 * @param handleAddComment Function to handle adding a new comment.
 */
const AnswerView = ({ text, ansBy, meta, comments, handleAddComment }: AnswerProps) => (
  <div className='answer right_padding'>
    <div id='answerText' className='answerText'>
      {handleHyperlink(text)}
    </div>
    <div className='answerAuthor'>
      <div className='answer_author'>{ansBy}</div>
      <div className='answer_question_meta'>{meta}</div>
    </div>
    <CommentSection comments={comments} handleAddComment={handleAddComment} />{' '}
    {/* Added CommentSection */}
  </div>
);

export default AnswerView;
