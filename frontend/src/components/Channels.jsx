import '../styles/App.css';
import Channel from './Channel';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice'
import AddIcon from '../assets/add.svg'

const Channels = () => {
  const channels = useSelector(selectors.selectAll)

  return (
    <div className="channels">
      <div className='channels-header'>
        <h3>Channels</h3>
        <button ><img src={AddIcon} alt="+" /></button>
      </div>
      {channels.map((channel) => (
        <Channel channel={channel} />
      ))}
    </div>
  );
};

export default Channels;
