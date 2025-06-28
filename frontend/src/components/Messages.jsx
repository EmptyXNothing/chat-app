import '../styles/App.css';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectors.selectAll)
  const { currentChannelId } = useSelector((state) => state.channels);
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId)

  return (
    <div className="messages">
      {filteredMessages.map((message) => <p>{message.body}</p>)}
    </div>
  );
};

export default Messages;
