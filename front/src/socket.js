import { io } from 'socket.io-client';
import { server } from './constants';

const URL = process.env.NODE_ENV === 'production' ? undefined : server;

export const socket = io(URL);