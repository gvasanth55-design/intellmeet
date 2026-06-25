import http from 'http';
import app from './app';
import { initializeSocket } from '../socket';

const server = http.createServer(app);
initializeSocket(server);

export default server;
