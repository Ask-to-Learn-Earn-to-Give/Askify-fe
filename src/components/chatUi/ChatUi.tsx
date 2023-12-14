import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import Button from '../ui/button/button';
import { useRouter } from 'next/router';
const ChatUi = ({ chatGroup, messages, handleSubmit }: any) => {
  const [messageInput, setMessageInput] = useState('');
  const { currentAccount, solvedProblem, unSolvedProblem } =
    useContext(ProblemSolverContext);
  const boxRef = useRef(null);
  const router = useRouter();
  const currentId = (chatGroup?.members || []).find(
    ({ address }: any) => address == currentAccount
  )?._id;

  const handleMessageSubmit = () => {
    // handleSubmit(messageInput);
    setMessageInput('');
  };
  console.log('messageInput', messageInput);
  // handle solve problem
  const handleSolverProblem = async () => {
    const probId = getNumberFromName(chatGroup?.name);
    if (probId && expertAddress) {
      const solved = await solvedProblem(probId, expertAddress);
    } else {
      console.log('data missing');
    }
  };
  const handleUnSolverProblem = async () => {
    const probId = getNumberFromName(chatGroup?.name);
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
      handleMessageSubmit();
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
        {messages.map(({ message, index }: any) => {
          const user = chatGroup.members.find(
            ({ _id }: any) => _id == message.senderId
          );
          return (
            <Message
              key={message._id}
              content={message.content}
              senderName={user.fullName}
              senderAvatar={user.avatarUrl}
              sentByCurrentUser={message.senderId == currentId}
            />
          );
        })}
      </div>

      <form
        className="mt-[20px]  h-[100px]  w-full"
        onSubmit={(event) => {
          event.preventDefault();
          handleMessageSubmit();
        }}
      >
        <div>
          <input
            type="text"
            className="h-[100px] w-full rounded-[10px] border-none bg-gray-100 p-[20px]"
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
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
