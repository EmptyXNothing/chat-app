import "../styles/App.css";
import Channels from "../components/Channels.jsx";
import MessagesForm from "../components/MessagesForm.jsx";
import Messages from "../components/Messages.jsx";
import ModalWindow from "../components/modals/ModalRoot.jsx";
import { useUser } from "../hooks/useUser.jsx";
import useChannels from "../hooks/useChannels.jsx";
import { useChannelStore } from "../store/channelStore.js";

const Main = () => {
  const { headers } = useUser();
  useChannels(headers);
  const { currentChannel } = useChannelStore();

  return (
    <div className="main-content">
      <Channels />
      <div className="chat">
        <div className="chat-name">
          <h3>{currentChannel?.name}</h3>
        </div>
        <Messages />
        <MessagesForm />
      </div>
      <ModalWindow />
    </div>
  );
};

export default Main;
