import mongoose from 'mongoose';
import supertest from 'supertest';
import { app, server } from '../server';
import * as util from '../models/application';
import { Answer, Question } from '../types';

const saveCommentSpy = jest.spyOn(util, 'saveComment');
const addCommentSpy = jest.spyOn(util, 'addComment');
const populateDocumentSpy = jest.spyOn(util, 'populateDocument');

describe('POST /addComment', () => {
  afterEach(async () => {
    await mongoose.connection.close(); // Ensure the connection is properly closed
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Ensure mongoose is disconnected after all tests
    server.close();
  });

  it('should add a new comment to the question', async () => {
    const validQid = new mongoose.Types.ObjectId();
    const validCid = new mongoose.Types.ObjectId();
    const mockReqBody = {
      id: validQid.toString(),
      type: 'question',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const mockComment = {
      _id: validCid,
      text: 'This is a test comment',
      commentBy: 'dummyUserId',
      commentDateTime: new Date('2024-06-03'),
    };

    const mockQuestion: Question = {
      _id: validQid,
      title: 'This is a test question',
      text: 'This is a test question',
      tags: [],
      askedBy: 'dummyUserId',
      askDateTime: new Date('2024-06-03'),
      views: 0,
      comments: [mockComment],
      answers: [],
      upVotes: [],
      downVotes: [],
    };

    saveCommentSpy.mockResolvedValueOnce(mockComment);
    addCommentSpy.mockResolvedValueOnce(mockQuestion);
    populateDocumentSpy.mockResolvedValueOnce(mockQuestion);

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      _id: validCid.toString(),
      text: 'This is a test comment',
      commentBy: 'dummyUserId',
      commentDateTime: mockComment.commentDateTime.toISOString(),
    });
  });

  it('should return bad request error if id property is missing', async () => {
    const mockReqBody = {
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return database error in response if saveComment method throws an error', async () => {
    const validQid = new mongoose.Types.ObjectId().toString();
    const mockReqBody = {
      id: validQid.toString(),
      type: 'answer',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    saveCommentSpy.mockResolvedValueOnce({ error: 'Error when saving a comment' });

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, error: 'Error when saving a comment' });
  });

  it('should return bad request error if comment property is missing', async () => {
    const mockReqBody = {
      id: new mongoose.Types.ObjectId().toString(),
      type: 'question',
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return bad request error if comment text is missing', async () => {
    const mockReqBody = {
      id: new mongoose.Types.ObjectId().toString(),
      type: 'question',
      comment: {
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return bad request error if commentBy is missing', async () => {
    const mockReqBody = {
      id: new mongoose.Types.ObjectId().toString(),
      type: 'question',
      comment: {
        text: 'This is a test comment',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return bad request error if commentDateTime is missing', async () => {
    const mockReqBody = {
      id: new mongoose.Types.ObjectId().toString(),
      type: 'question',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return 500 error if addComment method throws an error', async () => {
    const validQid = new mongoose.Types.ObjectId().toString();
    const mockReqBody = {
      id: validQid,
      type: 'question',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const errorMessage = 'Database error';
    addCommentSpy.mockRejectedValueOnce(new Error(errorMessage));

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe(`Error when adding comment: ${errorMessage}`);
  });

  it('should return bad request error if targetType property is missing', async () => {
    const mockReqBody = {
      targetId: new mongoose.Types.ObjectId().toString(),
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should return bad request error if targetType property is invalid', async () => {
    const mockReqBody = {
      targetId: new mongoose.Types.ObjectId().toString(),
      targetType: 'invalidType',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };

    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request');
  });

  it('should not emit commentUpdate event if there is an error in saving the comment', async () => {
    const validQid = new mongoose.Types.ObjectId().toString();
    const mockReqBody = {
      id: validQid,
      type: 'question',
      comment: {
        text: 'This is a test comment',
        commentBy: 'dummyUserId',
        commentDateTime: new Date('2024-06-03'),
      },
    };
    saveCommentSpy.mockResolvedValueOnce({ error: 'Error when saving a comment' });
    const socketEmitSpy = jest.spyOn(server, 'emit');
    const response = await supertest(app).post('/comment/addComment').send(mockReqBody);

    expect(response.status).toBe(500);
    expect(socketEmitSpy).not.toHaveBeenCalled();
  });
});
