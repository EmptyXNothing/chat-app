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

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const channelsResponse = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const messagesResponse = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(channelsActions.addChannels(channelsResponse.data));
      dispatch(channelsActions.setCurrentChannel('1'));
      dispatch(messagesActions.addMessages(messagesResponse.data));
      console.log(messagesResponse.data)
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
    </div>
  );
};

export default Main;
