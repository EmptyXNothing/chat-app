import '../styles/App.css';
import { useSelector } from 'react-redux';
import { actions } from '../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import { UserContext } from '../Contexts/UserProvider.jsx';
import { useContext } from 'react';
import axios from 'axios';
import { openModal } from '../slices/modalSlice';

const Channel = (props) => {
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
        dispatch(actions.setCurrentChannel('1'));
      } else {
        console.log('Нельзя удалить канал')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div
      className={style}
      onClick={() => dispatch(actions.setCurrentChannel(channel.id))}
    >
      {channel.name}
      <div className="channel-buttons">
        <button onClick={() => dispatch(openModal())}>
          <img src={EditIcon} alt="edit channel" />
        </button>
        <button
          onClick={async () => await handleDeleteChannel()}
        >
          <img src={DeleteIcon} alt="delete channel" />
        </button>
      </div>
    </div>
  );
};

export default Channel;
