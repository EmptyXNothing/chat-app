import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useMessageStore } from '../store/messageStore';
import { useChannelStore } from '../store/channelStore';
import routes from '../routes';

const useInit = (headers) => {
  const {
    setChannels,
    addChannel,
    renameChannel,
    removeChannel,
    setFirstChannel,
  } = useChannelStore();
  const currentChannel = useChannelStore((state) => state.currentChannel);
  const { setMessages, addMessage } = useMessageStore();

  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io();
  }
  const socket = socketRef.current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsResponse = await axios.get(routes.channels(), {
          headers,
        });
        const messagesResponse = await axios.get(routes.messages(), {
          headers,
        });
        const channelsData = channelsResponse.data;
        const messagesData = messagesResponse.data;
        setChannels(channelsData);
        setMessages(messagesData);
        setFirstChannel();
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [headers]);

  useEffect(() => {
    socket.on('newMessage', (arg) => addMessage(arg));
    socket.on('newChannel', (arg) => addChannel(arg));
    socket.on('removeChannel', ({ id }) => {
      removeChannel(id);
      if (id === currentChannel.id) {
        setFirstChannel();
      }
    });
    socket.on('renameChannel', (editedChannel) => renameChannel(editedChannel));

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [socket]);
};

export default useInit;
