import React, { useState } from 'react';
import { getMetaData } from '../../../tool';
import { Comment } from '../../../types';
import './index.css';
import useUserContext from '../../../hooks/useUserContext';

/**
 * Interface representing the props for the Comment Section component.
 *
 * - comments - list of the comment components
 * - handleAddComment - a function that handles adding a new comment, taking a Comment object as an argument
 */
interface CommentSectionProps {
  comments: Comment[];
  handleAddComment: (comment: Comment) => void;
}

/**
 * CommentSection component shows the users all the comments and allows the users add more comments.
 *
 * @param comments: an array of Comment objects
 * @param handleAddComment: function to handle the addition of a new comment
 */
const CommentSection = ({ comments, handleAddComment }: CommentSectionProps) => {
  const { user } = useUserContext(); // Get the current user from the useUserContext hook
  const [showComments, setShowComments] = useState<boolean>(false); // State to toggle comments visibility
  const [newComment, setNewComment] = useState<string>(''); // State to hold the new comment input
  const [error, setError] = useState<string>(''); // State to hold error messages

  const toggleComments = () => {
    setShowComments(!showComments); // Toggle the visibility of comments
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value); // Update the new comment input state
  };

  const handleAdd = () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty.'); // Display error if comment is empty
      return;
    }

    const comment: Comment = {
      text: newComment,
      commentBy: user.username,
      commentDateTime: new Date(),
    };

    handleAddComment(comment); // Add the new comment
    setNewComment(''); // Clear the input field
    setError(''); // Clear the error message
  };

  return (
    <div className='comment-section'>
      <button onClick={toggleComments}>{showComments ? 'Hide Comments' : 'Show Comments'}</button>
      {showComments && (
        <div>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className='comment'>
                <p>{comment.text}</p>
                <p>
                  <strong>{comment.commentBy}</strong> -{' '}
                  {getMetaData(new Date(comment.commentDateTime))}
                </p>
              </div>
            ))
          )}
          <div className='add-comment'>
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder='Add a comment...'
            />
            {error && <p className='error'>{error}</p>}
            <button onClick={handleAdd}>Add Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
