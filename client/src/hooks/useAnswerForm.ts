import { useState, useContext } from 'react';
import { Answer } from '../types';
import { validateHyperlink } from '../tool';
import addAnswer from '../services/answerService';
import UserContext from '../contexts/UserContext';

/**
 * Interface representing the props for the useAnswerForm hook.
 *
 * qid - The unique identifier for the question.
 * handleAnswer - Function to handle the action after an answer is successfully submitted.
 */
interface UseAnswerFormProps {
  qid: string;
  handleAnswer: (qid: string) => void;
}

/**
 * Interface representing the return values from the useAnswerForm hook.
 *
 * text - The text of the answer.
 * textErr - Error message for the answer text.
 * isSubmitting - Boolean indicating if the form is currently submitting.
 * handleChange - Function to handle changes to the answer text.
 * postAnswer - Function to handle posting the answer.
 */
interface UseAnswerFormReturn {
  text: string;
  textErr: string;
  isSubmitting: boolean;
  handleChange: (value: string) => void; // Updated to take a string
  postAnswer: () => Promise<void>;
}

/**
 * Custom hook to manage the state and logic for submitting an answer.
 *
 * @param qid - The unique identifier for the question.
 * @param handleAnswer - Function to handle the action after an answer is successfully submitted.
 * @returns An object containing the state and functions for managing the answer form.
 */
export default function useAnswerForm({
  qid,
  handleAnswer,
}: UseAnswerFormProps): UseAnswerFormReturn {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('User context is null.');
  }
  const { user } = context;

  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setText(value);
    setTextErr(''); // Clear error on input change
  };

  const validate = (): boolean => {
    if (!text.trim()) {
      setTextErr('Answer text cannot be empty.');
      return false;
    }
    if (!validateHyperlink(text)) {
      setTextErr('Invalid hyperlink format.');
      return false;
    }
    return true;
  };

  const postAnswer = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const answer: Answer = {
        text,
        ansBy: user.username,
        ansDateTime: new Date(),
        comments: [],
      };

      const res = await addAnswer(qid, answer);
      if (res && res._id) {
        handleAnswer(qid); // Trigger the callback on success
      }
    } catch (err) {
      setTextErr('Failed to submit the answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    text,
    textErr,
    isSubmitting,
    handleChange, // Now returns a string-based handler
    postAnswer,
  };
}
