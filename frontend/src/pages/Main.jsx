import '../styles/App.css';
import { UserContext } from '../Contexts/UserProvider.jsx';
import { useContext, useEffect } from 'react';
import Channels from '../components/Channels.jsx';
import axios from 'axios';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { useDispatch } from 'react-redux';
import MessagesForm from '../components/MessagesForm.jsx';
import Messages from '../components/Messages.jsx';
import { io } from "socket.io-client";
import ModalWindow from '../components/ModalWindow.jsx'

const Main = () => {
  const dispatch = useDispatch();
  const { headers } = useContext(UserContext);
  const socket = io();

  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.timeout(5000).on('newMessage', (arg) => {
          dispatch(messagesActions.addMessage(arg));
        });

        socket.timeout(3000).on('newChannel', (arg) => {
          console.log(arg)
          dispatch(channelsActions.addChannel(arg));
        });

        socket.timeout(3000).on('removeChannel', ({ id }) => {
          console.log(id)
          dispatch(channelsActions.removeChannel(id));
        });

        const channelsResponse = await axios.get('/api/v1/channels', {
          headers: headers,
        });

        const messagesResponse = await axios.get('/api/v1/messages', {
          headers: headers,
        });

        dispatch(channelsActions.addChannels(channelsResponse.data));
        dispatch(channelsActions.setCurrentChannel('1'));
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
        <Messages />
        <MessagesForm />
      </div>
      <ModalWindow />
    </div>
  );
};

export default Main;
