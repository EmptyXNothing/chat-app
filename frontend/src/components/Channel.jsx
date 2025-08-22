import '../styles/App.css';
import { useSelector } from 'react-redux';
import { actions } from '../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import { UserContext } from '../contexts/UserProvider.jsx';
import { useContext } from 'react';
import axios from 'axios';
import { openModal } from '../slices/modalSlice';
import { selectors } from '../slices/channelsSlice';

const Channel = (props) => {
  const channels = useSelector(selectors.selectAll);
  const { channel } = props;
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const style = channel.id === currentChannelId ? 'current channel' : 'channel';
  const { headers } = useContext(UserContext);

  const handleDeleteChannel = async () => {
    try {
      if (channel.removable) {
        await axios.delete(`/api/v1/channels/${channel.id}`, {
          headers,
        });
        if (currentChannelId === channel.id) {
          const firstChannel = channels[0]
          const { id, name } = firstChannel
          dispatch(actions.setCurrentChannel(id));
          dispatch(actions.setCurrentChannelName(name));
        }
      } else {
        console.log('Нельзя удалить канал');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={style}>
      <div
        className="channel-name"
        onClick={() => {
          dispatch(actions.setCurrentChannelName(channel.name));
          dispatch(actions.setCurrentChannel(channel.id));
        }}
      >
        <span>
          {channel.name.length > 7
            ? channel.name.slice(0, 7) + '...'
            : channel.name}
        </span>
      </div>
      <div className="channel-buttons">
        <button
          onClick={() =>
            dispatch(openModal({ type: 'editChannel', data: channel }))
          }
        >
          <img src={EditIcon} alt="edit channel" />
        </button>
        <button onClick={async () => await handleDeleteChannel()}>
          <img src={DeleteIcon} alt="delete channel" />
        </button>
      </div>
    </div>
  );
};

export default Channel;
