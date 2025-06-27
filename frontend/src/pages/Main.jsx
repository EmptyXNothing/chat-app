import '../styles/App.css';
import { UserContext } from '../Contexts/UserProvider.jsx';
import { useContext, useEffect } from 'react';
import Channels from '../components/Channels.jsx';
import axios from 'axios';
import { actions } from '../slices/channelsSlice.js';
import { useDispatch } from 'react-redux';
import MessagesForm from '../components/MessagesForm.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(actions.addChannels(response.data));
      dispatch(actions.setCurrentChannel('1'))
      console.log(response.data)
    };
    fetchData();
  }, []);
  return (
    <div className="main-content">
      <Channels />
      <div className="chat">
        <MessagesForm />
      </div>
    </div>
  );
};

export default Main;
