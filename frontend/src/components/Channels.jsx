import '../styles/App.css';
import Channel from './Channel';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/channelsSlice'

const Channels = () => {
  const channels = useSelector(selectors.selectAll)

  return (
    <div className="channels">
      {channels.map((channel) => (
        <Channel channel={channel} />
      ))}
    </div>
  );
};

export default Channels;
