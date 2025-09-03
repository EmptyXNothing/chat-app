import '../styles/App.css';
import { useChannelStore } from '../store/channelStore';
import { useMessageStore } from '../store/messageStore.js';

const Messages = () => {
  const { messages } = useMessageStore()
  const { currentChannel } = useChannelStore();
  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel.id
  );

  return (
    <div className="messages">
      {filteredMessages.map((message) => (
        <p>{message.body}</p>
      ))}
    </div>
  );
};

export default Messages;
