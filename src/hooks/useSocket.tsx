import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket({ namespace }: any) {
  const [socket, setSocket] = useState<Socket | null>(null);

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
