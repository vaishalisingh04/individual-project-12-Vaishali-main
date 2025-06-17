import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from './header';
import Main from './main';
import Login from './login';
import { User } from '../types';
import LoginContext from '../contexts/LoginContext';
import UserContext from '../contexts/UserContext';

/**
 * Represents the main component of the application.
 * It manages the state for search terms and the main title.
 */
const FakeStackOverflow = () => {
  const [user, setUser] = useState<User | null>(null); // State to hold the current user
  const [socket, setSocket] = useState<Socket | null>(null); // State to hold the socket connection

  const serverURL = process.env.REACT_APP_SERVER_URL; // Get the server URL from environment variables

  if (serverURL === undefined) {
    throw new Error("Environment variable 'REACT_APP_SERVER_URL' must be defined");
  }

  const [search, setSearch] = useState<string>(''); // State to hold the search term
  const [mainTitle, setMainTitle] = useState<string>('All Questions'); // State to hold the main title

  useEffect(() => {
    if (user && !socket) {
      setSocket(io(serverURL)); // Establish socket connection if user is logged in and socket is not already connected
    }

    return () => {
      if (socket !== null) {
        socket.disconnect(); // Disconnect socket when component unmounts or user logs out
      }
    };
  }, [serverURL, socket, user]);

  const setQuestionPage = (searchString: string = '', title: string = 'All Questions'): void => {
    setSearch(searchString); // Update the search term
    setMainTitle(title); // Update the main title
  };

  return (
    <LoginContext.Provider value={{ setUser }}>
      {user && socket ? (
        <UserContext.Provider value={{ user, socket }}>
          <Header search={search} setQuestionPage={setQuestionPage} />
          <Main title={mainTitle} search={search} setQuestionPage={setQuestionPage} />
        </UserContext.Provider>
      ) : (
        <Login />
      )}
    </LoginContext.Provider>
  );
};

export default FakeStackOverflow;
