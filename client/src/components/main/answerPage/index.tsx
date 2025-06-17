import React, { useContext, useEffect, useState } from 'react';
import { getMetaData } from '../../../tool';
import AnswerView from './answer';
import AnswerHeader from './header';
import './index.css';
import QuestionBody from './questionBody';
import { getQuestionById } from '../../../services/questionService';
import VoteComponent from '../voteComponent';
import { Question, Answer, Comment } from '../../../types';
import CommentSection from '../commentSection';
import addComment from '../../../services/commentService';
import UserContext from '../../../contexts/UserContext';

/**
 * Interface representing the props for the AnswerPage component.
 *
 * - qid - The unique identifier for the question.
 * - handleNewQuestion - Callback function to handle a new question.
 * - handleNewAnswer - Callback function to handle a new answer.
 */
interface AnswerPageProps {
  qid: string;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;
}

/**
 * AnswerPage component that displays the full content of a question along with its answers.
 * It also includes the functionality to vote, ask a new question, and post a new answer.
 *
 * @param qid The unique identifier of the question to be displayed.
 * @param handleNewQuestion Callback function to handle asking a new question.
 * @param handleNewAnswer Callback function to handle posting a new answer.
 */
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { socket } = context;
  const [question, setQuestion] = useState<Question | null>(null);

  const handleNewComment = async (
    comment: Comment,
    targetType: 'question' | 'answer',
    targetId: string | undefined,
  ) => {
    if (!targetId) {
      return;
    }

    try {
      const updatedComment = await addComment(targetId, targetType, comment);
      setQuestion(prevQuestion => {
        if (!prevQuestion) return prevQuestion;

        if (targetType === 'question') {
          return {
            ...prevQuestion,
            comments: [...prevQuestion.comments, updatedComment],
          };
        }
        return {
          ...prevQuestion,
          answers: prevQuestion.answers.map(answer =>
            answer._id === targetId
              ? { ...answer, comments: [...answer.comments, updatedComment] }
              : answer,
          ),
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionById(qid);
        setQuestion(res || null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching question:', error);
      }
    };

    // eslint-disable-next-line no-console
    fetchData().catch(e => console.log(e));
  }, [qid]);

  useEffect(() => {
    const handleAnswerUpdate = ({ answer }: { qid: string; answer: Answer }) => {
      setQuestion(prevQuestion =>
        prevQuestion
          ? { ...prevQuestion, answers: [...prevQuestion.answers, answer] }
          : prevQuestion,
      );
    };

    const handleCommentUpdate = ({
      result,
      type,
    }: {
      result: Question | Answer;
      type: 'question' | 'answer';
    }) => {
      setQuestion(prevQuestion => {
        if (!prevQuestion) return prevQuestion;

        if (type === 'question') {
          return {
            ...prevQuestion,
            comments: (result as Question).comments,
          };
        }
        return {
          ...prevQuestion,
          answers: prevQuestion.answers.map(answer =>
            answer._id === (result as Answer)._id
              ? { ...answer, comments: (result as Answer).comments }
              : answer,
          ),
        };
      });
    };

    socket.on('answerUpdate', handleAnswerUpdate);
    socket.on('viewsUpdate', setQuestion);
    socket.on('commentUpdate', handleCommentUpdate);

    return () => {
      socket.off('answerUpdate', handleAnswerUpdate);
      socket.off('viewsUpdate', setQuestion);
      socket.off('commentUpdate', handleCommentUpdate);
    };
  }, [socket]);

  if (!question) {
    return null;
  }

  return (
    <>
      <VoteComponent question={question} />
      <AnswerHeader
        ansCount={question.answers.length}
        title={question.title}
        handleNewQuestion={handleNewQuestion}
      />
      <QuestionBody
        views={question.views}
        text={question.text}
        askby={question.askedBy}
        meta={getMetaData(new Date(question.askDateTime))}
      />
      <CommentSection
        comments={question.comments}
        handleAddComment={comment => handleNewComment(comment, 'question', question._id)}
      />
      {question.answers.map((a, idx) => (
        <AnswerView
          key={idx}
          text={a.text}
          ansBy={a.ansBy}
          meta={getMetaData(new Date(a.ansDateTime))}
          comments={a.comments}
          handleAddComment={comment => handleNewComment(comment, 'answer', a._id)}
        />
      ))}
      <button
        className='bluebtn ansButton'
        onClick={() => {
          handleNewAnswer();
        }}>
        Answer Question
      </button>
    </>
  );
};

export default AnswerPage;
