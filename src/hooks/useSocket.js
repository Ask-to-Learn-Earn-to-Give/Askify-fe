import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(namespace) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(`${process.env.NEXT_PUBLIC_WS_URL}/${namespace}`, {
      query: {
        token: localStorage.getItem('token'),
      },
      transports: ['websocket'],
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return {
    socket,
  };
}
