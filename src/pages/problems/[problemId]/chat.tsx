import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import RootLayout from '@/layouts/_root-layout';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import ChatUi from '@/components/chatUi/ChatUi';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { useContext, useEffect, useState } from 'react';

interface Problem {
  chatGroupId: string;
}
interface Message {}
const ConnectRoom = () => {
  const { layout } = useLayout();
  const { socket } = useSocket('chat');
  const router = useRouter();
  const { problemId } = router.query;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [chatGroup, setChatGroup] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async ({ message }: any) => {
    socket?.emit('chat.user.send_message', {
      chatGroupId: problem?.chatGroupId,
      content: message,
    });
  };
  useEffect(() => {
    if (!problemId) return;
    if (!socket) return;

    async function fetchData() {
      try {
        const { problem } = (await axios.get(`/api/problem/${problemId}`)).data;
        const { chatGroup } = (
          await axios.get(`/api/chat/${problem.chatGroupId}`)
        ).data;
        const { messages } = (
          await axios.get(
            `/api/chat/${problem.chatGroupId}/messages?skip=0&limit=1024`
          )
        ).data;
        setProblem(problem);
        setChatGroup(chatGroup);
        setMessages(messages);

        socket?.emit('chat.user.join', { chatGroupId: problem.chatGroupId });
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
    socket?.on('chat.message.created', (message: any) => {
      setMessages((messages: any) => [...messages, message]);
    });
    return () => {
      socket?.off('chat.message.created');
    };
  }, [problemId, socket]);
  return (
    <>
      <NextSeo title="Connect Room" description="Askify " />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-gray-100"></div>
        <div className="col-span-2 ">
          <ChatUi
            chatGroup={chatGroup}
            messages={messages}
            handleSubmit={handleSubmit}
            problem={problem}
          />
        </div>
      </div>
    </>
  );
};

ConnectRoom.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default ConnectRoom;
