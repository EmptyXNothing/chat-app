import '../styles/App.css';
import Channels from '../components/Channels.jsx';
import MessagesForm from '../components/MessagesForm.jsx';
import Messages from '../components/Messages.jsx';
import ModalWindow from '../components/modals/ModalRoot.jsx';
import { useUser } from '../hooks/useUser.jsx';
import useInit from '../hooks/useInit.jsx';
import { useChannelStore } from '../store/channelStore.js';

const Main = () => {
  const { headers } = useUser();
  useInit(headers);
  const { currentChannel } = useChannelStore();

  return (
    <div className="main-content">
      <Channels />
      <div className="chat">
        <h3>{currentChannel?.name}</h3>
        <div className="chat-content">
          <Messages />
        </div>
        <MessagesForm />
      </div>
      <ModalWindow />
    </div>
  );
};

export default Main;
