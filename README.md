# Stack Overflow Clone

Welcome to the Stack Overflow Clone project! This project is a part of the individual project series aimed at enhancing your skills in frontend development with TypeScript and React, as well as backend development with Node.js, Express, and MongoDB.

## Table of Contents

- [Objectives](#objectives)
- [Getting Started](#getting-started)
- [Grading](#grading)
- [Implementation Tasks](#implementation-tasks)
  - [Task 0: Setup Environment Variables](#task-0-setup-environment-variables)
  - [Task 1: Implement Refactoring of Main Components Using Custom Hooks](#task-1-implement-refactoring-of-main-components-using-custom-hooks)
  - [Task 2: Implement Comment Feature](#task-2-implement-comment-feature)
  - [Task 3: Implement Communications Using Socket.IO](#task-3-implement-communications-using-socketio)
- [Submission Instructions](#submission-instructions)

## Objectives

The objectives of this assignment are to:

- Investigate and understand a large, existing codebase
- Write new TypeScript code that uses asynchronous operations
- Write test cases that utilize mocks and spies
- Write React components and hooks that make use of state

## Getting Started

1. **Clone the repository**: Start by accepting our invitation. It will create a GitHub repository for you which will include the starter code for this assignment.
2. **Install dependencies**: Run `npm install` within `./client` and `./server` to fetch the dependencies.
3. **Setup environment variables**: Follow the instructions in [Task 0](#task-0-setup-environment-variables) to set up your environment variables.

## Implementation Tasks

### Task 0: Setup Environment Variables

Create a file called `.env` in `./client` with the following content:

REACT_APP_SERVER_URL=http://localhost:8000

MONGODB_URI=mongodb://127.0.0.1:27017 CLIENT_URL=http://localhost:3000 PORT=8000



### Task 1: Implement Refactoring of Main Components Using Custom Hooks

1. **Create hooks folder under src**: In `./client/src`, create a folder named `hooks`.
2. **Create useAnswerForm custom hook for NewAnswer component**: Implement the `useAnswerForm` custom hook in `./client/src/hooks/useAnswerForm.ts`.
3. **Update and remove the state management from NewAnswer component**: Update `./client/src/components/main/newAnswer/index.tsx` to use the `useAnswerForm` hook.
4. **Create useHeader custom hook for component Header**: Implement the `useHeader` custom hook in `./client/src/hooks/useHeader.ts`.
5. **Update and remove the state management from component Header**: Update `./client/src/components/header/index.tsx` to use the `useHeader` hook.
6. **Create useTagSelected custom hook for component Tag**: Implement the `useTagSelected` custom hook in `./client/src/hooks/useTagSelected.ts`.
7. **Update and remove the state management from component Tag**: Update `./client/src/components/main/tagPage/tag/index.tsx` to use the `useTagSelected` hook.
8. **Create useVoteStatus custom hook for component VoteComponent**: Implement the `useVoteStatus` custom hook in `./client/src/hooks/useVoteStatus.ts`.
9. **Update and remove the state management from component VoteComponent**: Update `./client/src/components/voteComponent/index.tsx` to use the `useVoteStatus` hook.
10. **Create useNewQuestion custom hook for component newQuestion**: Implement the `useNewQuestion` custom hook in `./client/src/hooks/useNewQuestion.ts`.
11. **Use the useNewQuestion custom hook**: Update `./client/src/components/main/newQuestion/index.tsx` to use the `useNewQuestion` hook.
12. **Create useMainPage custom hook for index.tsx in Main component**: Implement the `useMainPage` custom hook in `./client/src/hooks/useMainPage.ts`.
13. **Use the useMainPage custom hook**: Refactor `./client/src/components/main/index.tsx` to use the `useMainPage` hook.
14. **Create useLoginContext custom hook**: Implement the `useLoginContext` custom hook in `./client/src/hooks/useLoginContext.ts`.
15. **Update and remove the state management from component Login**: Update `./client/src/components/login/index.tsx` to use the `useLoginContext` hook.
16. **Create useUserContext custom hook for component Login**: Implement the `useUserContext` custom hook in `./client/src/hooks/useUserContext.ts`.
17. **Use the useUserContext custom hook**: Identify the components that are using the `UserContext` and update them to use the `useUserContext` hook.

### Task 2: Implement Comment Feature

1. **Create Schema and Model for Comment**: Follow the documentation in `./server/models/schema/comment.ts` to add fields to the schema. Then, add the comments field in both `./server/models/schema/question.ts` and `./server/models/schema/answer.ts`. Next, in `./server/models/comments.ts`, create and export `CommentModel`.
2. **Define types for Comment**: In `./server/types.ts`, follow the documentation to create the `Comment` interface and `CommentResponse` type. Modify existing interfaces for `Question` and `Answer` to add a property for comments.
3. **Implement saveComment and addComment**: Follow the documentation to implement `saveComment` and `addComment` in `./server/models/application.ts`. Add additional tests for `addComment`.
4. **Modify populateDocument and fetchAndIncrementQuestionViewsById**: Modify `populateDocument` and `fetchAndIncrementQuestionViewsById` in `./server/models/application.ts` to also populate comments.
5. **Create AddCommentRequest**: Follow the documentation to create the `AddCommentRequest` interface in `./server/types.ts`.
6. **Create the controller for Comment**: Implement all the functions used in the endpoint in `./server/controller/comment.ts`. Write tests in `./server/tests/comment.spec.ts` to test the newly implemented endpoint.
7. **Define types for Comment in Client**: In `./client/src/types.ts`, follow the documentation to create the `Comment` interface, then add the comments property for `Question` and `Answer`.
8. **Implement addComment in commentService.ts**: Implement `addComment` in `./client/src/services/commentService.ts`.
9. **Create component for Comment**: Implement the `CommentSection` component in `./client/src/components/main/commentSection/index.tsx`.
10. **Use CommentSection in Answer component**: Modify `./client/src/components/main/answerPage/answer/index.tsx` to use the `CommentSection` component.
11. **Use CommentSection in the Answer Page**: Implement `handleNewComment` in `./client/src/components/main/answerPage/index.tsx` and update the HTML code to include the `CommentSection` component and the updated `Answer` component.

### Task 3: Implement Communications Using Socket.IO

1. **Implement missing code in useVoteStatus.ts**: Implement the missing code in `./client/src/hooks/useVoteStatus.ts` for the ability to update votes.
2. **Implement missing code in question.ts**: Implement the missing code in `./server/controller/question.ts` for the ability to update votes.
3. **Implement missing code in answerPage/index.tsx**: Implement the missing code in `./client/src/components/main/answerPage/index.tsx` for the ability to update comments.
4. **Implement missing code in comments.ts**: Implement the missing code in `./server/controller/comments.ts` for the ability to update comments.