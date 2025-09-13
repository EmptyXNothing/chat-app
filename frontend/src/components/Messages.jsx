import '../styles/App.css';
import { useChannelStore } from '../store/channelStore';
import { useMessageStore } from '../store/messageStore.js';
import { useEffect } from 'react';

const Messages = ({ scrollContainer }) => {
  const { messages } = useMessageStore()
  const { currentChannel } = useChannelStore();
  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel.id
  );

  useEffect(()=>{
      const item = scrollContainer.current
      if(item){
        console.log(item)
        item.scrollTo({top: item.scrollHeight})
      }
    }, [currentChannel, filteredMessages])

  return (
    <div className="messages" ref={scrollContainer}>
      {filteredMessages.map((message, i) => (
        <div className='message' key={i}>
          <h4>{message.username}</h4>
          <p>{message.body}</p>
        </div>
        
      ))}
    </div>
  );
};

export default Messages;
