import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from '../slices/channelsSlice';

const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setChannels(() => useSelector(selectors.selectAll));
      socket.timeout(3000).on('newChannel', (arg) => {
        setChannels((channels) => [...channels, arg]);
      });

      socket.timeout(3000).on('removeChannel', ({ id }) => {
        if (currentChannel.id === id) {
          switchToFirstChannel();
        }
        setChannels((channels) =>
          channels.filter((channel) => channel.id !== id)
        );
      });

      socket.timeout(3000).on('renameChannel', (editedChannel) => {
        setChannels((channels) =>
          channels.map((channel) =>
            channel.id === editedChannel.id ? editedChannel : channel
          )
        );
      });

      const channelsResponse = await axios.get('/api/v1/channels', {
        headers: headers,
      });
    };
  }, []);

  const switchToFirstChannel = () => {
    setCurrentChannel(channels[0]);
  };

  const deleteChannel = async (channel) => {
    try {
      if (channel.removable) {
        await axios.delete(`/api/v1/channels/${channel.id}`, {
          headers,
        });
        if (currentChannel.id === channel.id) {
          switchToFirstChannel();
        }
      } else {
        console.log('Нельзя удалить канал');
      }
    } catch (e) {
      console.log(e);
    }
  };
};
