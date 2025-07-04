import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../types';

/**
 * Interface represents the context type for user-related data and a WebSocket connection.
 *
 * - user - the current user.
 * - socket - the WebSocket connection associated with the current user.
 */
export interface UserContextType {
  user: User;
  socket: Socket;
}

const UserContext = createContext<UserContextType | null>(null);

// eslint-disable-next-line prettier/prettier
export default UserContext;