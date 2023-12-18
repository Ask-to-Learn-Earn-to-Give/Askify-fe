import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import Button from '../ui/button/button';
import { useRouter } from 'next/router';
const ChatUi = ({ chatGroup, messages, handleSubmit, problem }: any) => {
  const [messageInput, setMessageInput] = useState('');
  const { address, solvedProblem, unSolvedProblem } =
    useContext(ProblemSolverContext);
  const boxRef = useRef(null);
  const router = useRouter();
  const currentId = (chatGroup?.members || []).find(
    ({ address: address_ }: any) => address == address_
  )?._id;
  const handleMessageSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit({ message: messageInput });
    setMessageInput('');
  };

  // handle solve problem
  const handleSolverProblem = async () => {
    const probId = extractNumber(chatGroup?.name);

    if (probId && expertAddress) {
      const solved = await solvedProblem(probId, expertAddress);
    } else {
      console.log('data missing');
    }
  };
  function extractNumber(str: any) {
    const regex = /\d+/g;
    const matches = str.match(regex);
    if (matches && matches.length > 0) {
      return parseInt(matches[0]);
    } else {
      return null;
    }
  }

  const handleUnSolverProblem = async () => {
    const probId = extractNumber(chatGroup?.name);

    if (probId) {
      const unsolved = await unSolvedProblem(probId);
    } else {
      console.log('data missing');
    }
  };
  // get expert addrress:
  const expertAddress = (chatGroup?.members || []).find(
    ({ _id }: any) => _id !== chatGroup?.ownerId
  )?.address;
  // get problem ID
  function getNumberFromName({ name }: any) {
    var words = name?.split(' ') || '';
    var lastWord = words[words.length - 1]?.trim();
    if (/^\d+$/.test(lastWord)) {
      return parseInt(lastWord);
    } else {
      return null;
    }
  }
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleMessageSubmit(event);
    }
  };
  const handleCreate = () => {
    router.push('/nft/create-nft');
  };

  return (
    <div>
      <div
        className="h-[500px] max-h-[500px]  overflow-y-scroll  bg-gray-100 p-[30px]"
        ref={boxRef}
      >
        {messages.map((message: any, index: any) => {
          const user = chatGroup.members.find(
            ({ _id }: any) => _id == message.senderId
          );
          return (
            <Message
              key={message?._id}
              content={message?.content}
              senderName={user?.fullName}
              senderAvatar={user?.avatarUrl}
              sentByCurrentUser={message?.senderId == currentId}
            />
          );
        })}
      </div>

      <form
        className="mt-[20px]  h-[100px]  w-full"
        onSubmit={handleMessageSubmit}
      >
        <div>
          <input
            type="text"
            className="h-[100px] w-full rounded-[10px] border-none bg-gray-100 p-[20px]"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              color: 'gray',
            }}
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            placeholder="Type a message..."
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* <Button type="submit" btnName={"SEND"} handleClick={() => {}}>
    Send
  </Button> */}
      </form>
      <div className="w-80%   mt-[50px] ">
        <h1 className="">Your problems has Solved?</h1>
        <div className="flex-start m-[20px] flex gap-10">
          <Button onClick={() => handleSolverProblem()}>Solved</Button>
          <Button onClick={() => handleUnSolverProblem()}>Unsolved</Button>
          <Button onClick={handleCreate}>Create NFT</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
