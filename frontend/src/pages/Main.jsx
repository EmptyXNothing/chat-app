import '../styles/App.css';
import { UserContext } from '../contexts/UserProvider.jsx';
import { useContext, useEffect } from 'react';
import Channels from '../components/Channels.jsx';
import axios from 'axios';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import MessagesForm from '../components/MessagesForm.jsx';
import Messages from '../components/Messages.jsx';
import { io } from 'socket.io-client';
import ModalWindow from '../components/modals/ModalRoot.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const { headers } = useContext(UserContext);
  const socket = io();
  const { currentChannelName } = useSelector((state) => state.channels);

  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.timeout(5000).on('newMessage', (arg) => {
          dispatch(messagesActions.addMessage(arg));
        });

        socket.timeout(3000).on('newChannel', (arg) => {
          dispatch(channelsActions.addChannel(arg));
        });

        socket.timeout(3000).on('removeChannel', ({ id }) => {
          dispatch(channelsActions.removeChannel(id));
        });

        socket.timeout(3000).on('renameChannel', (channel) => {
          dispatch(
            channelsActions.editChannel({
              id: channel.id,
              changes: channel,
            })
          );
        });

        const channelsResponse = await axios.get('/api/v1/channels', {
          headers: headers,
        });

        const messagesResponse = await axios.get('/api/v1/messages', {
          headers: headers,
        });

        const firstChannel = channelsResponse.data[0]
        const { id, name } = firstChannel
        dispatch(channelsActions.addChannels(channelsResponse.data));
        dispatch(channelsActions.setCurrentChannel(id));
        dispatch(channelsActions.setCurrentChannelName(name));
        dispatch(messagesActions.addMessages(messagesResponse.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="main-content">
      <Channels />
      <div className="chat">
        <div className="chat-name">
          <h3>{currentChannelName}</h3>
        </div>
        <Messages />
        <MessagesForm />
      </div>
      <ModalWindow />
    </div>
  );
};

export default Main;
