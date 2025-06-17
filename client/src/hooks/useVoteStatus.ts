import { useState, useEffect, useContext } from 'react';
import { upvoteQuestion, downvoteQuestion } from '../services/questionService';
import { Question, VoteData } from '../types';
import UserContext from '../contexts/UserContext';

interface UseVoteStatusProps {
  question: Question;
}

export const useVoteStatus = ({ question }: UseVoteStatusProps) => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { user, socket } = context;
  const [count, setCount] = useState<number>(0);
  const [voted, setVoted] = useState<number>(0);

  useEffect(() => {
    const getVoteValue = () => {
      if (user.username && question?.upVotes?.includes(user.username)) {
        return 1;
      }
      if (user.username && question?.downVotes?.includes(user.username)) {
        return -1;
      }
      return 0;
    };

    // Set the initial count and vote value
    setCount((question.upVotes || []).length - (question.downVotes || []).length);
    setVoted(getVoteValue());

    const handleVoteUpdate = (voteData: VoteData) => {
      if (voteData.qid === question._id) {
        setCount(voteData.upVotes.length - voteData.downVotes.length);
        if (voteData.upVotes.includes(user.username)) {
          setVoted(1);
        } else if (voteData.downVotes.includes(user.username)) {
          setVoted(-1);
        } else {
          setVoted(0);
        }
      }
    };

    // Setup socket listener for vote updates
    socket.on('voteUpdate', handleVoteUpdate);

    // Cleanup socket listener on unmount
    return () => {
      socket.off('voteUpdate', handleVoteUpdate);
    };
  }, [question, user.username, socket]);

  const handleVote = async (type: string) => {
    try {
      if (question._id) {
        if (type === 'upvote') {
          await upvoteQuestion(question._id, user.username);
        } else if (type === 'downvote') {
          await downvoteQuestion(question._id, user.username);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while voting:', error);
    }
  };

  return { count, voted, handleVote };
};

export default useVoteStatus;
