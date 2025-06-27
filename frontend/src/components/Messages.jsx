import '../styles/App.css';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectors.selectAll)

  return (
    <div className="messages">
    </div>
  );
};

export default Messages;
