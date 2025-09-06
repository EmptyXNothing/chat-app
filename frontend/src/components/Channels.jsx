import '../styles/App.css';
import Channel from './Channel';
import AddIcon from '../assets/add.svg';
import { useChannelStore } from '../store/channelStore';
import { useModalStore } from '../store/modalStore';

const Channels = () => {
  const { openModal } = useModalStore();
  const { channels } = useChannelStore();

  return (
    <div className="channels">
      <div className="channels-header">
        <h3>Channels</h3>
        <button onClick={() => openModal('addChannel')}>
          <img src={AddIcon} alt="add channel" />
        </button>
      </div>
      {channels.map((channel) => (
        <Channel channel={channel} key={channel.id}/>
      ))}
    </div>
  );
};

export default Channels;
