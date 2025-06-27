import '../styles/App.css';
import { useSelector } from 'react-redux';
import { actions } from '../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';

const Channel = (props) => {
  const { channel } = props;
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const style = channel.id === currentChannelId ? 'current channel' : 'channel';


  return (
    <div className={style} onClick={() => dispatch(actions.setCurrentChannel(channel.id))}>
      {channel.name}
    </div>
  );
};

export default Channel;
