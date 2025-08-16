import '../styles/App.css';
import Channel from './Channel';
import { openModal } from '../slices/modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectors } from '../slices/channelsSlice';
import AddIcon from '../assets/add.svg';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  return (
    <div className="channels">
      <div className="channels-header">
        <h3>Channels</h3>
        <button onClick={() => dispatch(openModal({type: 'addChannel'}))}>
          <img src={AddIcon} alt="add channel" />
        </button>
      </div>
      {channels.map((channel) => (
        <Channel channel={channel} />
      ))}
    </div>
  );
};

export default Channels;
