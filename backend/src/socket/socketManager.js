import socket from "socket.io";
export const connectToSocket = (server) => {
  const io = new socket.Server(server);
};
