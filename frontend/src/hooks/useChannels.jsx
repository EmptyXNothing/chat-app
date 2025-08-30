import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useChannelStore } from '../store/channelStore';

const useChannels = (headers) => {
  const { setChannels, addChannel, renameChannel, removeChannel, setFirstChannel } = useChannelStore();
  const currentChannel = useChannelStore(state => state.currentChannel);

  // создаём сокет один раз
  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io();
  }
  const socket = socketRef.current;


  // загрузка каналов с API (только один раз при монтировании или смене headers)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/channels', { headers });
        const channelsData = response.data;
        setChannels(channelsData);
        setFirstChannel();
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [headers]);

  // подписка на события сокета
  useEffect(() => {
    socket.on('newChannel', (arg) => addChannel(arg));
    socket.on('removeChannel', ({ id }) => {
      removeChannel(id);
      if (id === currentChannel.id) {
        setFirstChannel();
      } 
    });
    socket.on('renameChannel', (editedChannel) => renameChannel(editedChannel));

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [socket, currentChannel]);
};


export default useChannels;
