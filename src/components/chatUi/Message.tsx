import React from 'react';
import Image from 'next/image';
const Message = ({
  content,
  senderName,
  senderAvatar,
  sentByCurrentUser,
}: any) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        margin: '10px',
        flexDirection: sentByCurrentUser ? 'row-reverse' : 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: sentByCurrentUser ? 'flex-end' : 'flex-start',
          maxWidth: '65%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              order: sentByCurrentUser ? '1' : '0',
              marginLeft: sentByCurrentUser ? '10px' : '0',
              marginRight: sentByCurrentUser ? '0' : '10px',
              textAlign: sentByCurrentUser ? 'right' : 'left',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                marginLeft: sentByCurrentUser ? '10px' : '0',
                marginRight: sentByCurrentUser ? '0' : '10px',
              }}
            >
              <img
                src={senderAvatar}
                width={50}
                height={50}
                alt={`${senderName}'s avatar`}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxWidth: '80px',
                color: 'gray',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{senderName}</span>
            </div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: sentByCurrentUser ? '#007bff' : '#e6e6e6',
                color: sentByCurrentUser ? '#fff' : '#333',
                padding: '10px',
                borderRadius: '10px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxWidth: '400px',
              }}
            >
              <div>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
