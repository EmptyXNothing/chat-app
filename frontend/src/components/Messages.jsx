import '../styles/App.css';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const Messages = ({currentChannel}) => {
  const messages = useSelector(selectors.selectAll)
  const filteredMessages = messages.filter((message) => message.channelId === currentChannel?.id)

  return (
    <div className="messages">
      <h3>{currentChannel?.name}</h3>
      {filteredMessages.map((message) => <p>{message.body}</p>)}
    </div>
  );
};

export default Messages;
